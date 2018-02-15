import React, { Component } from 'react';
import { Text, TextInput, View, Button } from 'react-native';

export default class HelloWorldApp extends Component {
  render() {
    return (

     <View style={{padding: 10}}>
      <Text>Hello world view!</Text>
        <TextInput
          style={{height: 40}}
          placeholder="Type here to translate!"
        />
             <Button
  onPress={() => {
    Alert.alert('You tapped the button!');
  }}
  title="Press Me"
	/>

     </View>
    );
  }
}
