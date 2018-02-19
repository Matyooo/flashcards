import React from 'react';
import { View, Text, Button, TouchableOpacity, List, FlatList, ListItem, StyleSheet } from 'react-native';
import {refreshList} from '../common.js';

class ChooserScreen extends React.Component {
    
    static navigationOptions = {
        title: 'Choose to edit',
    };

    constructor(props) {
        super(props);
        // TODO: is there a better way?
        this.that = this;
        this.state = {cards:[]};
        this._renderItem = this._renderItem.bind(this);
        refreshList(this);
    }

    // item renderer for FlatList
    _renderItem(card) {
        return(
            <TouchableOpacity
                onPress={() => {
                    this.props.navigation.navigate('Editor', {
                        card: card.item,
                        new: false,
                        onGoBack: () => {refreshList(this.that)}
                    })
                }}
            >
                <View style={{flex: 1, alignItems: 'center'}}>
                    <Text style={styles.qa}>Q: {card.item.question}</Text>
                    <Text style={styles.qa}>A: {card.item.answer}</Text>  
                </View>
            </TouchableOpacity>
        );
    }

    FlatListItemSeparator = () => {
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

    CardFlatList() {
        return(
                <FlatList
                    style={styles.list}
                    data={this.state.cards}
                    renderItem={this._renderItem}
                    ItemSeparatorComponent = {this.FlatListItemSeparator}
                    keyExtractor={item => item.id}
                />
        );
    }

    render() {
      return (   
        <View style={{ flex: 1}}>
            <View style={{ flex: 5, alignItems: 'center', justifyContent: 'center'}}>
                {this.CardFlatList()}
            </View>
            <View style={{ flex: 1, flexDirection:'row', alignItems: 'center', justifyContent: 'space-around',
                backgroundColor:'lightgrey' }}>
                <Button title='New Card'
                    onPress={() => {
                        this.props.navigation.navigate('Editor', {
                            new: true,
                            onGoBack: () => {refreshList(this.that)}
                        })
                    }}
                />    
            </View>
        </View>
      );
    }
}

const styles = StyleSheet.create({
    list: {
        width: "100%",
    },
    qa: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 15,
      },  
});


module.exports = ChooserScreen;