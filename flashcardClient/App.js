// In App.js in a new project

import React from 'react';
import { View, Text, Button, TouchableOpacity, List, FlatList, ListItem } from 'react-native';
import { StackNavigator } from 'react-navigation';

const SERVER_ADDR = "http://192.168.1.21:8080";


class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home23 Screen</Text>
        <Button
          title="Go to Editor"
          onPress={() => this.props.navigation.navigate('Editor')}
        />
      </View>
    );
  }
}

class EditorScreen extends React.Component {
    render() {
        // go back programatically
        //this.props.navigation.goBack();
        //this.props.navigation.navigate('Details', { /* params go here */ });
        //Read the params in your screen component: this.props.navigation.state.params.

      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Editor Screen</Text>
        </View>
      );
    }
}



class ChooserScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {cards:[]};

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



  GetItem (item) {     
    alert(item);
}
   
    _renderItem(card) {
        return(
            <TouchableOpacity 
            onPress={() => {
                alert('You tapped the button!');
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
                <Text>Choose card:</Text>
                {this.CardFlatList()}
            </View>
      );
    }
}
  

const RootStack = StackNavigator({
    Home: {
      screen: HomeScreen,
    },
    Editor: {
        screen: EditorScreen,
    },
    Chooser: {
        screen: ChooserScreen,
    },
    },
    {
      initialRouteName: 'Chooser',
    }
);
  
  export default class App extends React.Component {
    render() {
      return <RootStack />;
    }
  }