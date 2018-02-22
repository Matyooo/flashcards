import React from 'react';
import { View, Text, TextInput, Button, StyleSheet} from 'react-native';
import {styles} from '../common.js';

import { connect } from 'react-redux'; 
import { insertCardAsync, modifyCardAsync, showError, updateEditor } from '../actions';

class EditorScreen extends React.Component {

    constructor(props) {
        super(props);
        this.save = this.save.bind(this);
        this.callback = this.callback.bind(this);
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
            this.props.showError({answerError:""});
        } else {
            this.props.showError({answerError:response.message});
        }        
      }

    save = () => {
        if (this.props.new) {
            this.props.insertCard(this.props.question, this.props.answer, 
                this.callback);
        } else {
            this.props.modifyCard(this.props.cardId, this.props.question,
                this.props.answer, this.callback);
        }
    }

    validateQuestion = () => {
        var regex = /.{8,}\?$/;
        if (regex.test(this.props.question)) {
            this.props.showError({questionError:""});
            return true;
        } else {
            this.props.showError({questionError:"Question must end with ? and be at least 8 characters long!"});
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
                defaultValue = {this.props.question}
                onChangeText={(text) => {
                    this.props.updateEditor(text, this.props.answer);
                }}
            />
            <Text style={styles.err}>{this.props.questionError}</Text>
            <Text style={styles.qaeditor}>Answer</Text>
            <TextInput
                style={{height: 40, width: '80%', fontSize:14 }}
                defaultValue = {this.props.answer}
                onChangeText={(text) => {
                    this.props.updateEditor(this.props.question, text);
                }}
            />
            <Text style={styles.err}>{this.props.answerError}</Text>

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


const mapStateToProps = (state) => {
    return {
        question: state.FlashCardReducer.question,
        answer: state.FlashCardReducer.answer,
        questionError: state.FlashCardReducer.questionError,
        answerError: state.FlashCardReducer.answerError,
        new: state.FlashCardReducer.new,
        cardId: state.FlashCardReducer.cardId
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        insertCard: (q, a, callback) => dispatch(insertCardAsync(q, a, callback)),
        modifyCard: (id, q, a, callback) => dispatch(modifyCardAsync(id, q, a, callback)),
        showError: (errors) => dispatch(showError(errors)),
        updateEditor: (q, a) => dispatch(updateEditor(q, a))
    };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(EditorScreen);
