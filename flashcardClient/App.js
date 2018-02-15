import React, { Component } from 'react';
import { Text, TextInput, View, Button } from 'react-native';

const SERVER_ADDR = "http://192.168.1.14:8080";
const CARD_ID = "5a840a834542d016d5a7492a";

export default class HelloWorldApp extends Component {
  render() {
    return (

     <View style={{padding: 10}}>
      <Text>Flashcards API test</Text>
        <TextInput
          style={{height: 40}}
          placeholder="Type here to translate!"
      />
      <Button
        onPress={() => {
          fetch(SERVER_ADDR + "/cards")
          .then((response) => response.json())
          .then((responseJson) => {
            alert(JSON.stringify(responseJson)) 
          });
        }}
        title="GET ALL CARDS"
	    />
      <Button
        onPress={() => {
          fetch(SERVER_ADDR + "/cards", 
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "question": 'new question',
              "answer": 'new answer'
            }),
          })
        .then((response) => response.json())
        .then((responseJson) => {
          alert(JSON.stringify(responseJson));
        });
        }}
        title="POST NEW CARD"
	    />
      <Button
        onPress={() => {
          fetch(SERVER_ADDR + "/cards/" + CARD_ID, 
          {
            method: 'PATCH',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "question": 'modified question',
            }),
          })
          .then((response) => response.json())
          .then((responseJson) => {
            alert(JSON.stringify(responseJson));
          });
        }}
        title="MODIFY A CARD"
	    />
      
     </View>
    );
  }
}
