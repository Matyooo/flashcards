import React from 'react';
import { View, Text, TextInput, ToastAndroid, Button, TouchableOpacity, List, FlatList, ListItem } from 'react-native';

const SERVER_ADDR = "http://192.168.1.21:8080";

class EditorScreen extends React.Component {

    constructor(props) {
        super(props);
        this.save = this.save.bind(this);
    }
    
    static navigationOptions = {
        title: 'Edit card',
    };

    question = "";
    answer = "";

    save() {
        if (this.props.navigation.state.params.new) {
            // POST new card
            fetch(SERVER_ADDR + "/cards", 
            {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                "question": this.question,
                "answer": this.answer
              }),
            })
          .then((response) => response.json())
          .then((responseJson) => {
            ToastAndroid.show(JSON.stringify(responseJson), ToastAndroid.SHORT);
            this.props.navigation.state.params.onGoBack();
            this.props.navigation.goBack();
          })
          .catch((error) => {
              alert(error);  
          })
        } else {
            // PATCH modificate card
            fetch(SERVER_ADDR + "/cards/" + this.props.navigation.state.params.card.id, 
            {
              method: 'PATCH',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                "question": this.question,
                "answer": this.answer
              }),
            })
          .then((response) => response.json())
          .then((responseJson) => {
            ToastAndroid.show(JSON.stringify(responseJson), ToastAndroid.SHORT);
            this.props.navigation.state.params.onGoBack();
            this.props.navigation.goBack();
          })
          .catch((error) => {
              alert(error);  
          })
        }
    }

    render() {
        this.question = this.props.navigation.state.params.new
            ? "" : this.props.navigation.state.params.card.question;
        this.answer = this.props.navigation.state.params.new 
            ? "" : this.props.navigation.state.params.card.answer;

      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Question</Text>
            <TextInput
                style={{height: 40, width: '80%' }}
                defaultValue = {this.question}
                onChangeText={(text) => this.question = text}
            />
            <Text>Answer</Text>
            <TextInput
                style={{height: 40, width: '80%' }}
                defaultValue = {this.answer}
                onChangeText={(text) => this.answer = text}
            />
          <Button title='Save'
            onPress={() => {
                this.save();
            }}
          />
        </View>
      );
    }
}

module.exports = EditorScreen;