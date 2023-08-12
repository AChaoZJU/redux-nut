import  createStore  from "./createStore";

// import {compose} from "redux";
// import thunk from 'redux-thunk'
// import logger from 'redux-logger'
// import promise from 'redux-promise'
// import {createStore} from "redux";
import applyMiddleware from "../redux-nut/applyMiddleware";
import combineReducers from "../redux-nut/combineReducer";
// import {combineReducers} from "redux";

function thunk({ getState, dispatch }) {
    return (next) => (action) => {
        if(typeof action === 'function') {
            return action(dispatch, getState)
        }
        return next(action)
    }
}


function logger({ getState, dispatch }) {
    return next => action => {
        console.log('------------------------')
        const prevState = getState()
        console.log('prev state', prevState)
        const value = next(action)
        const nextState  = getState()
        console.log('next state', nextState)
        console.log('------------------------')
        return value
    }
}

function promise({ getState, dispatch }) {
    return (next) => (action) => {
        if(typeof action?.then === 'function') {
            return action?.then(next)
        }
        return next(action)
    }
}



export function countReducer(state = 0, action) {
    switch (action.type) {
        case "ADD":
            return state + 1;
        case "MINUS":
            return state - 1;
        default:
            return state;
    }
}

const store = createStore(combineReducers({count: countReducer}), applyMiddleware(thunk, promise, logger))


export default store
