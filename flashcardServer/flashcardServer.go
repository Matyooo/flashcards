// cardserver.go
package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"strings"
	"time"

	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

// MongoDB address
const DB_ADDR = "localhost:27017"

type Card struct {
	Id       bson.ObjectId `json:"id" bson:"_id,omitempty"`
	Question string        `json:"question"`
	Answer   string        `json:"answer"`
}

type NewCard struct {
	Question string `json:"question"`
	Answer   string `json:"answer"`
}

type MyResp struct {
	Status  string `json:"status"`
	Message string `json:"message"`
}

var session *mgo.Session
var cardsCollection *mgo.Collection

// Sets headers for repsonse and creates a JSON
// from the status message struct
func finishResponse(resp MyResp, w http.ResponseWriter) {
	// create response
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE")
	js, _ := json.Marshal(resp)
	w.Write(js)
	log.Println(string(js))
}

func handlerCardsPOST(w http.ResponseWriter, r *http.Request) {
	log.Println("POST request")
	var resp MyResp
	newCard := NewCard{}
	if strings.Contains(r.Header.Get("Content-Type"), "application/json") {
		// decode JSON request into Card
		bodyBytes, _ := ioutil.ReadAll(r.Body)
		bodyString := string(bodyBytes)
		log.Println(bodyString)
		err := json.Unmarshal(bodyBytes, &newCard)
		if err != nil {
			resp := MyResp{
				"MALFORMED_JSON",
				"Patch request JSON malformed!"}
			finishResponse(resp, w)
			return
		}

		log.Printf("Request JSON data (Question: %s, Answer: %s)\n",
			newCard.Question, newCard.Answer)
	}

	if strings.Contains(r.Header.Get("Content-Type"),
		"application/x-www-form-urlencoded") {
		// decode FORM request into Card
		r.ParseForm()
		log.Printf("Request FORM data (Question: %s, Answer: %s)\n",
			r.FormValue("question"), r.FormValue("answer"))
		newCard = NewCard{r.FormValue("question"), r.FormValue("answer")}
	}

	// format check
	if newCard.Answer != "" {
		// insert into db
		err := cardsCollection.Insert(newCard)
		if err != nil {
			log.Println("DB Insert error", err.Error())
			resp = MyResp{
				"INSERT_FAIL",
				"New card could not be inserted!"}
			finishResponse(resp, w)
			return
		}
	} else {
		resp = MyResp{
			"ANSWER_CHECK_FAIL",
			"Answer field must not be empty!"}
		finishResponse(resp, w)
		return
	}
	// success
	resp = MyResp{
		"SUCCESS",
		"New card inserted"}
	finishResponse(resp, w)
}

func handlerCardsGET(w http.ResponseWriter, r *http.Request) {
	log.Println("GET request")

	// send all cards in JSON
	w.Header().Set("Content-Type", "application/json")
	result := []Card{}
	err := cardsCollection.Find(bson.M{}).All(&result)
	if err != nil {
		log.Fatal(err)
	}
	b, _ := json.Marshal(result)

	log.Println(string(b))
	w.Write(b)
}

func recoverWrongId(w http.ResponseWriter) {
	if r := recover(); r != nil {
		resp := MyResp{
			"BAD_CARD_ID",
			"Requested card id not valid!"}
		finishResponse(resp, w)
	}
}

func handlerCardsPATCH(w http.ResponseWriter, r *http.Request) {

	log.Println("PATCH request")
	id := r.URL.Path[len("/cards/"):]
	log.Println("card ID:", id)
	log.Println(r.Header.Get("Content-Type"))
	if !strings.Contains(r.Header.Get("Content-Type"), "application/json") {
		// abort if Body is not JSON
		resp := MyResp{
			"DATA_NOT_JSON",
			"Patch request needs JSON!"}
		finishResponse(resp, w)
		return
	}

	// decode JSON request
	bodyBytes, _ := ioutil.ReadAll(r.Body)
	bodyString := string(bodyBytes)
	log.Println("Request JSON:", bodyString)
	newCard := NewCard{}
	err := json.Unmarshal(bodyBytes, &newCard)
	if err != nil {
		resp := MyResp{
			"MALFORMED_JSON",
			"Patch request JSON malformed!"}
		finishResponse(resp, w)
		return
	}

	// check for empty answer
	if newCard.Answer == "" {
		resp := MyResp{
			"ANSWER_CHECK_FAIL",
			"Answer field must not be empty!"}
		finishResponse(resp, w)
		return
	}

	// recover from a bad card Id
	defer recoverWrongId(w)
	objId := bson.ObjectIdHex(id)
	// update db
	err = cardsCollection.UpdateId(objId, bson.M{"$set": newCard})
	if err != nil {
		resp := MyResp{
			"CARD_UPDATE_FAILED",
			"Card update failed!"}
		finishResponse(resp, w)
		return
	}

	resp := MyResp{"CARD_UPDATE_SUCCESS", "Card updated"}
	finishResponse(resp, w)
}

func handler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		handlerCardsGET(w, r)
	case http.MethodPost:
		handlerCardsPOST(w, r)
	}
}

func main() {
	var err error
	session, err = mgo.Dial(DB_ADDR)
	if err != nil {
		panic(err)
	}
	defer session.Close()
	session.SetMode(mgo.Monotonic, true)

	cardsCollection = session.DB("flashcards").C("cards")
	http.HandleFunc("/cards", handler)
	http.HandleFunc("/cards/", handlerCardsPATCH)
	s := &http.Server{
		Addr:           ":8080",
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}
	log.Fatal(s.ListenAndServe())
}
