import { combineReducers } from 'redux';
import * as Actions from "../actions/"

var initialState = {
    // HOME
    notification:'',
    cardIndex: -1,
    showQuestion: true,
    cards:[],
    loading: false,
    // EDITOR
    question: '',
    answer: '',
    questionError : '', 
    answerError: '',   
    new: false,
    cardId: ''
}

FlashCardReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.GET_CARDS_SUCCESS:
            state = Object.assign({}, state, { cards: action.cards, loading: false });
            return state;
        case Actions.INSERT_CARD_SUCCESS:
            state = Object.assign({}, state, { loading: false });
            return state;
        case Actions.MODIFY_CARD_SUCCESS:
            state = Object.assign({}, state, { loading: false });
            return state;
            case Actions.REQUEST_STARTED:
            state = Object.assign({}, state, { loading: true });
            return state;
        case Actions.REQUEST_FAILED:
            state = Object.assign({}, state, { loading: false });
            return state;
    

        case Actions.SHOW_NOTIFICATION:
            state = Object.assign({}, state, {notification: action.text});
            return state;
        case Actions.HIDE_NOTIFICATION:
            state = Object.assign({}, state, {notification: ''});
            return state;
        case Actions.SELECT_CARD:
            let index = -1;
            let cardNum = state.cards.length;
            if (cardNum > 0) {
                index = Math.floor(Math.random() * cardNum);
            }
            state = Object.assign({}, state, {cardIndex: index, showQuestion : Math.random() > 0.5});
            return state;
        case Actions.INIT_EDITOR:
            state = Object.assign({}, state, {
                question: action.question, 
                answer: action.answer, 
                questionError:'', 
                answerError:'',
                new: action.new,
                cardId: action.cardId
            });
            return state;  
        case Actions.UPDATE_EDITOR:
            state = Object.assign({}, state, {
                question: action.question, 
                answer: action.answer, 
            });
            return state;  

        case Actions.SHOW_ERROR:
            state = Object.assign({}, state, {questionError:action.errors.questionError,
                answerError: action.errors.answerError});
            return state;

        default:
            return state;
    }
}

// Combine all the reducers
export default rootReducer = combineReducers({
    FlashCardReducer
});
