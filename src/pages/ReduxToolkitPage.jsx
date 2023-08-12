import {increment } from "../store/counterSlice";
import store from "../store/rtkStore";
import {useLayoutEffect} from "react";
import {useReducer} from "react";
import {useSelector, useUpdate} from "../react-redux-nut/react-redux-nut";

export default function ReduxToolkitPage(props) {
    const counter = store.getState().counter.value
    useUpdate(store)
    // const counter = useSelector(state => state.counter.value)


    return (
        <div>
            <h3>ReduxToolkitPage</h3>
            <button onClick={() => store.dispatch(increment()) }>{counter}</button>
        </div>
    );
}