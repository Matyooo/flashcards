import React from 'react';
import { View, Text, TextInput, ToastAndroid, Button, StyleSheet} from 'react-native';
import {SERVER_ADDR} from '../common.js';

class EditorScreen extends React.Component {

    constructor(props) {
        super(props);
        // TODO: Is there a better way to do this
        this.save = this.save.bind(this);
        this.question = this.props.navigation.state.params.new
            ? "" : this.props.navigation.state.params.card.question;
        this.answer = this.props.navigation.state.params.new 
            ? "" : this.props.navigation.state.params.card.answer;

        this.state = {questionError : "", answerError: ""};
    }

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        return {
          title: params.new ? "New card" : "Edit card",
        }
    };


    insertNewCard() {
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
        if (responseJson.status != "ANSWER_CHECK_FAIL") {
            ToastAndroid.show(responseJson.message, ToastAndroid.SHORT);
            this.props.navigation.state.params.onGoBack();
            this.props.navigation.goBack();    
            this.setState({answerError:""});
        } else {
            this.setState({answerError:responseJson.message});
        }
        })
        .catch((error) => {
        alert(error);  
        })
    }


    modifyCard() {
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
        if (responseJson.status != "ANSWER_CHECK_FAIL") {
            ToastAndroid.show(responseJson.message, ToastAndroid.SHORT);
            this.props.navigation.state.params.onGoBack();
            this.props.navigation.goBack();    
            this.setState({answerError:""});
        } else {
            this.setState({answerError:responseJson.message});
        }
        })
        .catch((error) => {
        alert(error);  
        })
    }



    save() {
        if (!this.valid) {
            return;
        }
        if (this.props.navigation.state.params.new) {
            this.insertNewCard();
        } else {
            this.modifyCard();
        }
    }

    validateQuestion(){
        var regex = /.{8,}\?$/;
        this.valid = regex.test(this.question);
        if (this.valid) {
            this.setState({questionError:""});
        } else {
            this.setState({questionError:"Question must end with ? and be at least 8 characters long!"});            
        }
        return this.valid;
    }


    render() {    
        return (
            <View style={{ flex: 1}}>
            <View style={{ flex: 5, alignItems: 'center', justifyContent: 'flex-start'}}>
            <Text style={styles.qa}>Question</Text>
            <TextInput
                style={{height: 40, width: '80%', fontSize:14 }}
                defaultValue = {this.question}
                onChangeText={(text) => {
                    this.question = text;
                }}
            />
            <Text style={styles.err}>{this.state.questionError}</Text>
            <Text style={styles.qa}>Answer</Text>
            <TextInput
                style={{height: 40, width: '80%', fontSize:14 }}
                defaultValue = {this.answer}
                onChangeText={(text) => this.answer = text}
            />
            <Text style={styles.err}>{this.state.answerError}</Text>

            </View>
            <View style={{ flex: 1, flexDirection:'row', alignItems: 'center', justifyContent: 'space-around',
                    backgroundColor:'lightgrey' }}>
                <Button title='Save'
                    onPress={() => {
                        if (this.validateQuestion()) {
                            this.save();
                        }
                    }}
                />
            </View>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    qa: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20,
      },
      err: {
        color: 'red',
        fontWeight: 'bold',
        fontSize: 15,
      },
  });

module.exports = EditorScreen;