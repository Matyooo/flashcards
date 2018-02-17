import React from 'react';
import { View, Text, Button, TouchableOpacity, List, FlatList, ListItem } from 'react-native';

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
    }
    static navigationOptions = {
        title: 'Flashcards',
      };
    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Button
            title="Go to Editor"
            onPress={() => this.props.navigation.navigate('Chooser')}
          />
        </View>
      );
    }
}

module.exports = HomeScreen;
  