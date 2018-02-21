import React from 'react';
import { View, Text, Button, TouchableOpacity, List, FlatList, ListItem, StyleSheet } from 'react-native';
import {getCards, styles} from '../common.js';

class ChooserScreen extends React.Component {
    
    static navigationOptions = {
        title: 'Choose to edit',
    };

    constructor(props) {
        super(props);
        this.refreshCallback = this.refreshCallback.bind(this);
        this._renderItem = this._renderItem.bind(this);
        this.state = {
            cards:[], 
            message:''
        };
        getCards(this.refreshCallback);
    }

    refreshCallback = (response) => {
        this.setState({cards: response});
   }

    goBack = (message) => {
        getCards(this.refreshCallback);
        this.setState({"message" : message});
        setTimeout(() => {this.setState({message:''})}, 3000);
    }

    // item renderer for FlatList
    _renderItem = (card) => {
        return(
            <TouchableOpacity
                onPress={() => {
                    this.props.navigation.navigate('Editor', {
                        card: card.item,
                        new: false,
                        onGoBack: this.goBack
                    })
                }}
            >
                <View style={{flex: 1, alignItems: 'center'}}>
                    <Text style={styles.qachooser}>Q: {card.item.question}</Text>
                    <Text style={styles.qachooser}>A: {card.item.answer}</Text>  
                </View>
            </TouchableOpacity>
        );
    }

    flatListItemSeparator = () => {
        return (
          <View
                style={{
                height: 1,
                width: "100%",
                backgroundColor: 'lightgrey',
          }}
          />
        );
      }

    cardsFlatList = () => {
        return(
                <FlatList
                    style={styles.list}
                    data={this.state.cards}
                    renderItem={this._renderItem}
                    ItemSeparatorComponent = {this.flatListItemSeparator}
                    keyExtractor={item => item.id}
                />
        );
    }

    render = () => {
      return (   
        <View style={{ flex: 1}}>
            <View style={{ flex: 5, alignItems: 'center', justifyContent: 'center'}}>
                {this.cardsFlatList()}
            </View>
            <View style={styles.toast}>
                <Text>{this.state.message}</Text>
            </View>
            <View style={{ flex: 1, flexDirection:'row', alignItems: 'center', justifyContent: 'space-around',
                backgroundColor:'lightgrey' }}>
                <Button title='New Card'
                    onPress={() => {
                        this.props.navigation.navigate('Editor', {
                            new: true,
                            onGoBack: this.goBack
                        })
                    }}
                />    
            </View>
        </View>
      );
    }
}

module.exports = ChooserScreen;