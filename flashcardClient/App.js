// In App.js in a new project

import React from 'react';
import { StackNavigator } from 'react-navigation';


var ChooserScreen = require('./chooser.js');
var EditorScreen = require('./editor.js');
var HomeScreen = require('./home.js');


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
      initialRouteName: 'Home',
    }
);
  
  export default class App extends React.Component {
    render() {
      return <RootStack />;
    }
  }