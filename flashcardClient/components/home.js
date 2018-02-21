import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import {getCards, styles} from '../common.js';


class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        getCards(this.refreshCallback);
        this.state = {
            disabledEditButton : true,
            message:'',
            cardIndex: -1,
            showQuestion: true,
            cards:[]
        }
    }

    static navigationOptions = {
        title: 'Flashcards',
    };

    refreshCallback = (response) => {
        this.setState({
            cards: response, 
            disabledEditButton : response.length < 1});
        // Select a card only if there was none selected
        if (this.state.cardIndex == -1) {
            this.selectRandomCard();  
        }
   }
    
    goBack = (message) => {
        getCards(this.refreshCallback);
        this.setState({"message" : message});
        setTimeout(() => {this.setState({message:''})}, 3000);
    }


    selectRandomCard = () => {
        var index = -1;
        this.state.showQuestion = Math.random() > 0.5;
        if (this.state.cards != null) {
            // choose random card
            var cardNum = this.state.cards.length;
            if (cardNum > 0) {
                index = Math.floor(Math.random() * cardNum);
            }
        }
        this.setState({cardIndex: index})
    }

    showCard = () => {
        if (this.state.cardIndex >= 0) {  
            // choose randomly to show question or answer
            if (this.state.showQuestion) {
                return(
                    <Text style={styles.qa}>Question: {this.state.cards[this.state.cardIndex].question}</Text>
                );
            } else {
                return(
                    <Text style={styles.qa}>Answer: {this.state.cards[this.state.cardIndex].answer}</Text>
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
                <Text>{this.state.message}</Text>
            </View>
            <View style={{ flex: 1, flexDirection:'row', alignItems: 'center', justifyContent: 'space-around',
                    backgroundColor:'lightgrey' }}>
                <Button style={{margin: 10}}
                    title="Next"
                    onPress={() => {
                        this.selectRandomCard();
                    }}
                />
                <Button
                title="Edit"
                disabled = {this.state.disabledEditButton}
                onPress={() => {
                    this.props.navigation.navigate('Editor', {
                        card: this.state.cards[this.state.cardIndex],
                        new: false,
                        onGoBack: this.goBack           
                    })
                }}
                />
                <Button
                title="New"
                onPress={() => {
                    this.props.navigation.navigate('Editor', {
                        new: true,
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

module.exports = HomeScreen;
  