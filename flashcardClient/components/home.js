import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { styles } from '../common.js';

import { connect } from 'react-redux'; 
import { getCardsAsync, showNotification, selectCard, initEditor } from '../actions';


class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        this.props.getCards(() => showNotification('Cards loaded.'));
    }

    static navigationOptions = {
        title: 'Flashcards',
    };
    
    goBack = (message) => {
        this.props.getCards();
        this.props.showNotification(message);
    }

    showCard = () => {
        if (this.props.cardIndex >= 0) {  
            // choose randomly to show question or answer
            if (this.props.showQuestion) {
                return(
                    <Text style={styles.qa}>Question: {this.props.cards[this.props.cardIndex].question}</Text>
                );
            } else {
                return(
                    <Text style={styles.qa}>Answer: {this.props.cards[this.props.cardIndex].answer}</Text>
                );
            }    
        } else {
            return(
                <Text style={styles.qa}>No cards found in DB</Text>
            );            
        }
    }

    render = () => {
      return (
          <View style={{ flex: 1}}>
            <View style={{ flex: 5, alignItems: 'center', justifyContent: 'center'}}>
                {this.showCard()}
            </View>
            <View style={styles.toast}>
                <Text>{this.props.loading ? "Loading cards..." : ""}{this.props.notification}</Text>
            </View>
            <View style={{ flex: 1, flexDirection:'row', alignItems: 'center', justifyContent: 'space-around',
                    backgroundColor:'lightgrey' }}>
                <Button style={{margin: 10}}
                    title="Next"
                    onPress={() => {
                        this.props.selectCard();
                    }}
                />
                <Button
                title="Edit"
                disabled = {this.props.cardIndex == -1}
                onPress={() => {
                    this.props.initEditor(false, 
                        this.props.cards[this.props.cardIndex].question,
                        this.props.cards[this.props.cardIndex].answer, 
                        this.props.cards[this.props.cardIndex].id);
                    
                    this.props.navigation.navigate('Editor', {
                        onGoBack: this.goBack           
                    })
                }}
                />
                <Button
                title="New"
                onPress={() => {
                    this.props.initEditor(true, '', '', '');
                    this.props.navigation.navigate('Editor', {
                        onGoBack: this.goBack           
                    })
                }}
                />
                <Button
                title="Show all"
                onPress={() => {
                    this.props.navigation.navigate('Chooser');
                }}
                />
            </View>
        </View>
      );
    }
}


const mapStateToProps = (state) => {
    return {
        cards: state.FlashCardReducer.cards,
        cardIndex: state.FlashCardReducer.cardIndex,
        showQuestion: state.FlashCardReducer.showQuestion,
        loading: state.FlashCardReducer.loading,
        notification: state.FlashCardReducer.notification
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getCards: (callback) => dispatch(getCardsAsync(callback)),
        showNotification: (text) => dispatch(showNotification(text)),
        selectCard: () => dispatch(selectCard()),
        initEditor: (isnew, q, a, id) => dispatch(initEditor(isnew, q, a, id))
    };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
  