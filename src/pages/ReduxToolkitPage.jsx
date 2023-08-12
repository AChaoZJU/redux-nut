import {increment } from "../store/counterSlice";
import store from "../store/rtkStore";
import {useCallback, useLayoutEffect} from "react";
import {useReducer} from "react";
import {useDispatch, useSelector, useUpdate} from "../react-redux-nut/react-redux-nut";
import {bindActionCreators} from "redux";

export default function ReduxToolkitPage(props) {
    // const counter = store.getState().counter.value
    // useUpdate(store)
    const counter = useSelector(state => state.counter.value)

    const dispatch = useDispatch()

    const incrementAction = useCallback(() => {
        bindActionCreators(increment, dispatch)()
    }, [])


    return (
        <div>
            <h3>ReduxToolkitPage</h3>
            <button onClick={incrementAction}>{counter}</button>
        </div>
    );
}