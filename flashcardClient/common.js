import { StyleSheet } from 'react-native';

const SERVER_ADDR = "http://192.168.1.21:8080";

export const getCards = (callback) => {
    // get all cards from the server
    fetch(SERVER_ADDR + "/cards")
    .then((response) => response.json())
    .then((responseJson) => {
        callback(responseJson);
    })
    .catch ((error) => {
        alert("refreshList error: " + error);
    });        
}

export const insertCard = (question, answer, callback) => {
    fetch(SERVER_ADDR + "/cards", 
    {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        "question": question,
        "answer": answer
    }),
    })
    .then((response) => response.json())
    .then((responseJson) => {
        callback(responseJson);
    })
    .catch((error) => {
        alert("insertCard error: " + error);  
    })    
}

export const modifyCard = (id, question, answer, callback) => {
    fetch(SERVER_ADDR + "/cards/" + id, 
    {
    method: 'PATCH',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        "question": question,
        "answer": answer
    }),
    })
    .then((response) => response.json())
    .then((responseJson) => {
        callback(responseJson);
    })
    .catch((error) => {
        alert("modifyCard error: " + error);  
    })
}


export const styles = StyleSheet.create({
    qa: {
      color: 'black',
      fontWeight: 'bold',
      fontSize: 30,
    },
    toast: {
        height:40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    qaeditor: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20,
    },
    err: {
        color: 'red',
        fontWeight: 'bold',
        fontSize: 15,
    },
    list: {
        width: "100%",
    },
    qachooser: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 15,
    },
    toast: {
        height:40,
        alignItems: 'center',
        justifyContent: 'center'
    }  
});


