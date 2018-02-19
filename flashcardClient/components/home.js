import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import {refreshList} from '../common.js';


class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        refreshList(this);
        this.state = {disabledEditButton : true}
        // TODO: Is there a better way?
        this.that = this;
        this.cardIndex = 0;
    }

    static navigationOptions = {
        title: 'Flashcards',
    };

    showCard() {
        if (this.state.cards != null) {
            // choose random card
            var cardNum = this.state.cards.length;
            if (cardNum > 0) {
                this.cardIndex = Math.floor(Math.random() * cardNum);
                // choose randomly to show question or answer
                if (Math.random() > 0.5) {
                    return(
                        <Text style={styles.qa}>Question: {this.state.cards[this.cardIndex].question}</Text>
                    );
                } else {
                    return(
                        <Text style={styles.qa}>Answer: {this.state.cards[this.cardIndex].answer}</Text>
                    );
                }    
            } else {
                return(
                    <Text style={styles.qa}>No cards found in DB</Text>
                );            
            }
        }
    }

    render() {
      return (
          <View style={{ flex: 1}}>
            <View style={{ flex: 5, alignItems: 'center', justifyContent: 'center'}}>
                {this.showCard()}
            </View>
            <View style={{ flex: 1, flexDirection:'row', alignItems: 'center', justifyContent: 'space-around',
                    backgroundColor:'lightgrey' }}>
                <Button style={{margin: 10}}
                    title="Next"
                    onPress={() => {
                        this.setState({next:true});
                    }}
                />
                <Button
                title="Edit"
                disabled = {this.state.disabledEditButton}
                onPress={() => {
                    this.props.navigation.navigate('Editor', {
                        card: this.state.cards[this.cardIndex],
                        new: false,
                        onGoBack: () => {refreshList(this.that)}
                    })
                }}
                />
                <Button
                title="New"
                onPress={() => {
                    this.props.navigation.navigate('Editor', {
                        new: true,
                        onGoBack: () => {refreshList(this.that)}
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


const styles = StyleSheet.create({
    qa: {
      color: 'black',
      fontWeight: 'bold',
      fontSize: 30,
    },
});

module.exports = HomeScreen;
  