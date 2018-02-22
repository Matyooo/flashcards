import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducers/index';
import * as Actions from './actions';
import configureStore from './store/store';

var ChooserScreen = require('./components/chooser.js');
var EditorScreen = require('./components/editor.js');
var HomeScreen = require('./components/home.js');


const store = configureStore();
store.subscribe(() => {
//  alert(JSON.stringify(store.getState()));
});


// Main navigator
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
    return (
      <Provider store={store}>
          <RootStack />
      </Provider>
    );
  }
}