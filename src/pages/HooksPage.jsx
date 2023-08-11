import {useReducer} from "react";
import {countReducer} from "../store";

const initializer = (arg) => arg - 0

export default function HooksPage(props) {
    const [state, dispatch]= useReducer(countReducer, '0', initializer)

    return (
        <div>
            <h3>HooksPage</h3>
            <button onClick={() => dispatch({ type: 'ADD'}) }>{state}</button>
        </div>
    )
}