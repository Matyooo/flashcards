import React from 'react';
import { View, Text, Button, TouchableOpacity, List, FlatList, ListItem, StyleSheet } from 'react-native';
import {styles} from '../common.js';

import { connect } from 'react-redux'; 
import { getCardsAsync, showNotification, initEditor } from '../actions';


class ChooserScreen extends React.Component {
    
    static navigationOptions = {
        title: 'Choose to edit',
    };

    constructor(props) {
        super(props);
        this.renderItem = this.renderItem.bind(this);
    }

    goBack = (message) => {
        this.props.getCards();
        this.props.showNotification(message);
    }

    // item renderer for FlatList
    renderItem = (card) => {
        return(
            <TouchableOpacity
                onPress={() => {
                    this.props.initEditor(false, 
                        card.item.question,
                        card.item.answer, 
                        card.item.id);
                    
                    this.props.navigation.navigate('Editor', {
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
                data={this.props.cards}
                renderItem={this.renderItem}
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
                <Text>{this.props.notification}</Text>
            </View>
            <View style={{ flex: 1, flexDirection:'row', alignItems: 'center', justifyContent: 'space-around',
                backgroundColor:'lightgrey' }}>
                <Button title='New Card'
                    onPress={() => {
                        this.props.initEditor(true, '', '', '');
                        this.props.navigation.navigate('Editor', {
                            onGoBack: this.goBack           
                        })
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
        loading: state.FlashCardReducer.loading,
        notification: state.FlashCardReducer.notification
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getCards: (callback) => dispatch(getCardsAsync(callback)),
        showNotification: (text) => dispatch(showNotification(text)),
        initEditor: (isnew, q, a, id) => dispatch(initEditor(isnew, q, a, id))
    };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(ChooserScreen);
