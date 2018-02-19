import React from 'react';
import { View, Text, TextInput, Button, StyleSheet} from 'react-native';
import {insertCard, modifyCard, styles} from '../common.js';

class EditorScreen extends React.Component {

    constructor(props) {
        super(props);
        this.save = this.save.bind(this);
        this.callback = this.callback.bind(this);
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



    callback(response) {
        if (response.status != "ANSWER_CHECK_FAIL") {
            this.props.navigation.state.params.onGoBack(response.message);
            this.props.navigation.goBack();    
            this.setState({answerError:""});
        } else {
            this.setState({answerError:response.message});
        }        
      }

    save() {
        if (!this.valid) {
            return;
        }
        if (this.props.navigation.state.params.new) {
            insertCard(this.question, this.answer, this.callback);
        } else {
            modifyCard(this.props.navigation.state.params.card.id, 
                this.question, this.answer, this.callback);
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
            <Text style={styles.qaeditor}>Question</Text>
            <TextInput
                style={{height: 40, width: '80%', fontSize:14 }}
                defaultValue = {this.question}
                onChangeText={(text) => {
                    this.question = text;
                }}
            />
            <Text style={styles.err}>{this.state.questionError}</Text>
            <Text style={styles.qaeditor}>Answer</Text>
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


module.exports = EditorScreen;