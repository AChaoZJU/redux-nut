// Pass store as context
// 1. Create a context object

import React, {useCallback, useContext, useEffect, useLayoutEffect, useReducer, useState} from "react";
import bindActionCreators from "../redux-nut/bindActionCreators";

const Context = React.createContext()


// 2. Provider组件传递value(store)
export function Provider({store, children}) {
    return (<Context.Provider value={store}>
        {children}
        </Context.Provider>)
}

// 3. Consume the value passed from the provider
// contextType: only used in class component; only subscribe single context source
// useContext: functional components; customized hook
// Consumer: no limit

// const getDispatchPropsFromObject = (objects, dispatch) => {
//     let dispatchProps = {}
//     for(const k in objects) {
//         dispatchProps[key] = () => dispatch(objects[k]())
//     }
//     return dispatchProps
// }

export const useForceUpdate = () => {
   return useCallback(useReducer(x=> x + 1, 0)[1], [])
}

export const connect = (mapStateToProps, mapDispatchToProps) => C => props => {
    const store = useContext(Context)

    const {subscribe, dispatch, getState} = store

    const forceUpdate = useForceUpdate()

    useLayoutEffect(() => {
        const unsubscribe = subscribe(() => {
            forceUpdate()
        })
        return () => {
            unsubscribe()
        }
    }, [])

    let dispatchProps = { dispatch }
    if(typeof mapDispatchToProps === 'function') {
        dispatchProps = mapDispatchToProps(dispatch)
    } else {
        dispatchProps = bindActionCreators(mapDispatchToProps, dispatch)
    }

    return <C {...props} {...dispatchProps} {...mapStateToProps(getState(), props)}/>

}