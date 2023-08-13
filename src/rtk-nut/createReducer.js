
// let _reducer = createReducer(option.initialState, (builder) =>{
//     for(const key in option.reducers) {
//         builder.addCase(`${option.name}/${key}`, reducerMap.get(`${option.name}/${key}`))
//     }
// })

// import createNextState from "immer";

import {createNextState} from "@reduxjs/toolkit";

export function createReducer(initialState, mapOrBuildCallback) {
    let [actionType2Reducer] = executeReducerBuilderCallback(mapOrBuildCallback)

    function reducer(state = initialState, action) {
        const caseReducer = [actionType2Reducer[action.type]]
        return caseReducer.reduce((prev, caseReducer)  => {
            if (caseReducer) {
                return createNextState(prev, (draft) => {return caseReducer(draft, action)})
            }
            return prev
        }, state)

    }

    return reducer

}

function executeReducerBuilderCallback(mapOrBuildCallback) {
    const actionType2Reducer = {}

    const builder = {
        addCase: (type, reducer) => {
            actionType2Reducer[type] = reducer
            return builder
        }
    }

    mapOrBuildCallback(builder)

    return [actionType2Reducer]

}