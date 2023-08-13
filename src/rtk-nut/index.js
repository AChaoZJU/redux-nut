// import { combineReducers, createStore } from "redux";

import combineReducers from "../redux-nut/combineReducer";
import createStore from "../store/createStore";
import {createReducer} from "./createReducer";
// import {createReducer} from "@reduxjs/toolkit";

export function configureStore(options) {
    const { reducer } = options
    const rootReducer = combineReducers(reducer)
    return createStore(rootReducer)
}


export function createSlice(option) {
    let actionCreators = {}
    let reducerMap = new Map() // key => func
    for(const key in option.reducers) {
        actionCreators[key] = (payload) => ({
            type: `${option.name}/${key}`,
            payload: payload
        })
        // actionCreators[key].type = `${option.name}/${key}`
        reducerMap.set(`${option.name}/${key}`,option.reducers[key])
    }

    // function buildReducer() {
    //     return createReducer(option.initialState, (builder) =>{
    //         for(const key in option.reducers) {
    //             builder.addCase(`${option.name}/${key}`, reducerMap.get(`${option.name}/${key}`))
    //         }
    //     })
    // }

    let _reducer = createReducer(option.initialState, (builder) =>{
        for(const key in option.reducers) {
            builder.addCase(`${option.name}/${key}`, reducerMap.get(`${option.name}/${key}`))
        }
    })

    return {
        actions: actionCreators,
        reducer: _reducer
            // if (!_reducer) _reducer = buildReducer();

            // return _reducer(state, action);
        // }
        // reducer: (state = option.initialState, action) => {
        //     if (reducerMap.has(action.type)) {
        //        reducerMap.get(action.type)(state, action)
        //         return state
        //     }else {
        //         return state
        //     }
        // }
    }

}