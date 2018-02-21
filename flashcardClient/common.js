
import { StyleSheet } from 'react-native';
const request = require('superagent');

const SERVER_ADDR = 'http://192.168.1.21:8080';

export const getCards = (callback) => {
    request
    .get(SERVER_ADDR + "/cards")
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .end((err, res) => {
        if (err) {
            alert(err);
        } else {
            callback(res.body);
        }
    });
}

export const insertCard = (question, answer, callback) => {
    request.post(SERVER_ADDR + "/cards")
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .send({
        "question": question,
        "answer": answer
    })
    .end((err, res) => {
        if (err) {
            alert("insertCard error: " + err);
        } else {
            callback(res.body);
        }
    });
}

export const modifyCard = (id, question, answer, callback) => {
    request.patch(SERVER_ADDR + "/cards/" + id)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .send({
        "question": question,
        "answer": answer
    })
    .end((err, res) => {
        if (err) {
            alert("modifyCard error: " + err);
        } else {
            callback(res.body);
        }
    });
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


