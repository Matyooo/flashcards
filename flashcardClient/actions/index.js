import { getCards, insertCard, modifyCard } from '../common.js';
const request = require('superagent');

// API actions
export const GET_CARDS_SUCCESS = 'GET_CARDS_SUCCESS';
export const INSERT_CARD_SUCCESS = 'INSERT_CARD_SUCCESS';
export const MODIFY_CARD_SUCCESS = 'MODIFY_CARD_SUCCESS';
export const REQUEST_STARTED = 'REQUEST_STARTED';
export const REQUEST_FAILED = 'REQUEST_FAILED';

// GUI actions
export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
export const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION';
export const SELECT_CARD = 'SELECT_CARD';
export const INIT_EDITOR = 'INIT_EDITOR';
export const SHOW_ERROR = 'SHOW_ERROR;'
export const UPDATE_EDITOR = 'UPDATE_EDITOR';

// other constants
const SERVER_ADDR = 'http://192.168.1.21:8080';
const NOTIFICATION_TIMEOUT = 2500;  // notification timeout in ms

export function selectCard() {
    return { type: SELECT_CARD };
}

export function showError(errors) {
    return { type: SHOW_ERROR, errors}
}

export function updateEditor(q, a) {
    return {
        type: UPDATE_EDITOR,
        question: q,
        answer: a
    }
}
export function initEditor(isNew, question, answer, cardId) {
    return {
        type: INIT_EDITOR, 
        'question':question, 
        'answer':answer, 
        'cardId':cardId, 
        new: isNew}
}

export function showNotification(message) {
    return dispatch => {
        dispatch({type: SHOW_NOTIFICATION, text:message});
        setTimeout(() => {
            dispatch({type: HIDE_NOTIFICATION});
        }, NOTIFICATION_TIMEOUT);
    }
}

export function getCardsAsync(callback) {
    return (dispatch, getState) => {
        dispatch({type : REQUEST_STARTED});
        request
        .get(SERVER_ADDR + "/cards")
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .then(
            (response) => {
                dispatch({type: GET_CARDS_SUCCESS, "cards": response.body});
                if (getState().FlashCardReducer.cardIndex == -1) {
                    dispatch({type: SELECT_CARD});
                }
                if (callback !== undefined) {
                    callback(response.body);
                }
            }, (error) => {
                dispatch({type : REQUEST_FAILED, error});
            }
        );    
    }
}

export function insertCardAsync(question, answer, callback) {
    return dispatch => {
        dispatch({type : REQUEST_STARTED});
        request
        .post(SERVER_ADDR + "/cards")
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({
            "question": question,
            "answer": answer
        })
        .then(
            (response) => { 
                dispatch({ type: INSERT_CARD_SUCCESS })
                dispatch(showNotification('Card saved.'));
                if (callback !== undefined) {
                    callback(response.body);
                }
            }, (error) => {
                dispatch({type : REQUEST_FAILED, error});
            }
        )
    }
}

export function modifyCardAsync(id, question, answer, callback) {
    return dispatch => {
        dispatch({type : REQUEST_STARTED});
        request
        .patch(SERVER_ADDR + "/cards/" + id)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({
            "question": question,
            "answer": answer
        })
        .then((response) => {
                dispatch({type: MODIFY_CARD_SUCCESS});
                dispatch(showNotification('Card modified'));
                if (callback !== undefined) {
                    callback(response.body);
                }
            }, (error) => {
                dispatch({type : REQUEST_FAILED, error});
            }
        )
    }
}