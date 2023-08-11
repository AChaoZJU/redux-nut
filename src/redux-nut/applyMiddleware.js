import {compose} from "./compose";

export default function applyMiddleware(...middlewares) {
    return (createStore) => (reducer) => {
        const store = createStore(reducer)
        let dispatch = store.dispatch
        // enhance dispatch

        const middle = {
            getState: store.getState,
            dispatch: (action, ...args) => dispatch(action, ...args )
        }

        const middlewareChain = middlewares.map(middleware =>  middleware(middle))

        //enhanced dispatch = all middlewares' dispatch + store.dispatch
        dispatch = compose(...middlewareChain)(store.dispatch)

        return {
            ...store,
            dispatch
        }
    }
}