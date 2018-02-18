// In App.js in a new project

import React from 'react';
import { StackNavigator } from 'react-navigation';


var ChooserScreen = require('./chooser.js');
var EditorScreen = require('./editor.js');
var HomeScreen = require('./home.js');


const RootStack = StackNavigator({
    Editor: {
        screen: EditorScreen,
    },
    Chooser: {
        screen: ChooserScreen,
    },
    Home: {
      screen: HomeScreen,
  },
  },
    {
      initialRouteName: 'Home',
      
      navigationOptions: {
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
    },
);
  
  export default class App extends React.Component {
    render() {
      return <RootStack />;
    }
  }