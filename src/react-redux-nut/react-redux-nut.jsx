// Pass store as context
// 1. Create a context object

import React, {useSyncExternalStore, useCallback, useContext, useEffect, useLayoutEffect, useReducer, useState} from "react";
import bindActionCreators from "../redux-nut/bindActionCreators";

const StoreContext = React.createContext()


// 2. Provider组件传递value(store)
export function Provider({store, children}) {
    return (<StoreContext.Provider value={store}>
        {children}
        </StoreContext.Provider>)
}

// 3. Consume the value passed from the provider
// contextType: only used in class component; only subscribe single context source
// useContext: functional components; customized hook
// Consumer: no limit

export const useForceUpdate = () => {
   return useCallback(useReducer(x=> x + 1, 0)[1], [])
}

export const connect = (mapStateToProps, mapDispatchToProps) => C => props => {
    const store = useContext(StoreContext)

    const {dispatch, getState, subscribe} = store

    const forceUpdate = useForceUpdate()

    // useUpdate(store)

    const state = useSyncExternalStore(
        () => subscribe(forceUpdate), getState
    )

    // console.log('checked', state === getState())

    let dispatchProps
    if(typeof mapDispatchToProps === 'function') {
        dispatchProps = mapDispatchToProps(dispatch)
    } else {
        dispatchProps = bindActionCreators(mapDispatchToProps, dispatch)
    }

    return <C {...props} {...dispatchProps} {...mapStateToProps(getState(), props)}/>
}

export const useUpdate = (store) => {
    const forceUpdate = useForceUpdate()

    useLayoutEffect(() => {
        const unsubscribe = store.subscribe(() => {
            forceUpdate()
        })
        return () => {
            unsubscribe()
        }
    }, [])
}

export function useSelector(selector) {
    const store = useContext(StoreContext)

    const forceUpdate = useForceUpdate()

    useUpdate(store)
    //  useSyncExternalStore(() => store.subscriber(forceUpdate), store.getState)

    return selector(store.getState())
}

export function useDispatch() {
    const store = useContext(StoreContext)
    return store.dispatch
}