// In App.js in a new project

import React from 'react';
import { StackNavigator } from 'react-navigation';


var ChooserScreen = require('./chooser.js');
var EditorScreen = require('./editor.js');


const RootStack = StackNavigator({
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