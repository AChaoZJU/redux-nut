import {increment, incrementByAmount } from "../store/counterSlice";
import store from "../store/rtkStore";
import {useCallback, useLayoutEffect} from "react";
import {useReducer} from "react";
import {useDispatch, useSelector, useUpdate} from "../react-redux-nut/react-redux-nut";
import {bindActionCreators} from "redux";

export default function ReduxToolkitPage(props) {
    // const counter = store.getState().counter.value
    // useUpdate(store)
    const count = useSelector(state => state.counter.value)

    const dispatch = useDispatch()

    const incrementAction = useCallback(() => {
        bindActionCreators(increment, dispatch)()
    }, [])


    return (
        <div>
            <h3>ReduxToolkitPage</h3>
            <button onClick={() => store.dispatch(increment())}>{count}</button>
            <button onClick={() => store.dispatch(incrementByAmount(100))}>
                每次累加100：{count}
            </button>
            <button onClick={() => store.dispatch({type: "counter/increment"})}>
                {count}
            </button>
        </div>
    );
}