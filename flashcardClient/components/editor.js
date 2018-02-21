import React from 'react';
import { View, Text, TextInput, Button, StyleSheet} from 'react-native';
import {insertCard, modifyCard, styles} from '../common.js';

class EditorScreen extends React.Component {

    constructor(props) {
        super(props);
        this.save = this.save.bind(this);
        this.callback = this.callback.bind(this);
        this.state = {
            question: this.props.navigation.state.params.new
                ? "" : this.props.navigation.state.params.card.question,
            answer: this.props.navigation.state.params.new 
                ? "" : this.props.navigation.state.params.card.answer,
            questionError : "", 
            answerError: "",
        };
    }

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        return {
          title: params.new ? "New card" : "Edit card",
        }
    };



    callback = (response) => {
        if (response.status != "ANSWER_CHECK_FAIL") {
            this.props.navigation.state.params.onGoBack(response.message);
            this.props.navigation.goBack();    
            this.setState({answerError:""});
        } else {
            this.setState({answerError:response.message});
        }        
      }

    save = () => {
        if (this.props.navigation.state.params.new) {
            insertCard(this.state.question, this.state.answer, this.callback);
        } else {
            modifyCard(this.props.navigation.state.params.card.id, 
                this.state.question, this.state.answer, this.callback);
        }
    }

    validateQuestion = () => {
        var regex = /.{8,}\?$/;
        if (regex.test(this.state.question)) {
            this.setState({questionError:""});
            return true;
        } else {
            this.setState({questionError:"Question must end with ? and be at least 8 characters long!"});            
            return false;
        }
    }


    render = () => {    
        return (
            <View style={{ flex: 1}}>
            <View style={{ flex: 5, alignItems: 'center', justifyContent: 'flex-start'}}>
            <Text style={styles.qaeditor}>Question</Text>
            <TextInput
                style={{height: 40, width: '80%', fontSize:14 }}
                defaultValue = {this.state.question}
                onChangeText={(text) => {
                    this.state.question = text;
                }}
            />
            <Text style={styles.err}>{this.state.questionError}</Text>
            <Text style={styles.qaeditor}>Answer</Text>
            <TextInput
                style={{height: 40, width: '80%', fontSize:14 }}
                defaultValue = {this.state.answer}
                onChangeText={(text) => this.state.answer = text}
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