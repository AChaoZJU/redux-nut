// import { combineReducers, createStore } from "redux";

import combineReducers from "../redux-nut/combineReducer";
import createStore from "../store/createStore";

export function configureStore(options) {
    const { reducer } = options
    const rootReducer = combineReducers(reducer)
    return createStore(rootReducer)
}

// const counterSlice = createSlice({
//     name: 'counter',
//     initialState: {value: 0},
//     reducers: {
//         increment: (state) => {
//             state.value += 1;
//         },
//         decrement: (state) => {
//             state.value -= 1;
//         },
//         incrementByAmount: (state, action) => {
//             state.value += action.payload;
//         },
//     }
// })

export function createSlice(option) {
    let actionCreators = {}
    let reducerMap = new Map() // key => func
    for(const key in option.reducers) {
        actionCreators[key] = (payload) => ({
            type: `${option.name}/${key}`,
            payload: payload
        })
        reducerMap.set(`${option.name}/${key}`,option.reducers[key])
    }

    return {
        actions: actionCreators,
        reducer: (state = option.initialState, action) => {
            if (reducerMap.has(action.type)) {
               reducerMap.get(action.type)(state, action)
                return state
            }else {
                return state
            }
        }
    }

}