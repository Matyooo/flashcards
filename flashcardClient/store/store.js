import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import rootReducer from '../reducers';


export default function configureStore() {
    return createStore(rootReducer, applyMiddleware(ReduxThunk));
} 
