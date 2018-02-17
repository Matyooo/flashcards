import React from 'react';
import { View, Text, Button, TouchableOpacity, List, FlatList, ListItem } from 'react-native';

const SERVER_ADDR = "http://192.168.1.21:8080";

class ChooserScreen extends React.Component {
    
    static navigationOptions = {
        title: 'Choose a card',
      };


    constructor(props) {
        super(props);
        this.state = {cards:[]};

        this._renderItem = this._renderItem.bind(this);
        this.refreshList();
    }

    refreshList() {
        // get all cards from the server
        fetch(SERVER_ADDR + "/cards")
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({ cards: responseJson });
        })
        .catch ((error) => {
            alert(error);
        });        
    }

    _renderItem(card) {
        return(
            <TouchableOpacity
                onPress={() => {
                    this.props.navigation.navigate('Editor', {
                        card: card.item,
                        new: false,
                        onGoBack: () => {this.refreshList()}
                    })
                }}
            >
                <Text>Q: {card.item.question}</Text>
                <Text>A: {card.item.answer}</Text>  
            </TouchableOpacity>
        );
    }

    FlatListItemSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              width: "100%",
              backgroundColor: "#607D8B",
            }}
          />
        );
      }

    CardFlatList() {
        return(
                <FlatList
                    data={this.state.cards}
                    renderItem={this._renderItem}
                    ItemSeparatorComponent = {this.FlatListItemSeparator}
                    keyExtractor={item => item.id}
                />
        );
    }
    render() {
      return (        
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width:'100%' }}>
                <Button title='New Card'
                    onPress={() => {
                        this.props.navigation.navigate('Editor', {
                            new: true,
                            onGoBack: () => {this.refreshList()}
                        })
                    }}
                />
                {this.CardFlatList()}
            </View>
      );
    }
}


module.exports = ChooserScreen;