export default function combineReducers(reducers) {
    // reducers: reducerMap
    // return (prevState, action) => nextState
    return function (state = {}, action) {
        let nextState = {}
        let hasChanged = false

        for(const key in reducers) {
            const reducer = reducers[key]
            nextState[key] = reducer(state[key], action)
             hasChanged = hasChanged || nextState[key] !== state[key]
        }

        hasChanged = hasChanged || Object.keys(nextState).length !== Object.keys(state).length

        return hasChanged ? nextState : state
    }
}