// import {configureStore} from "@reduxjs/toolkit";
import countReducer from "./counterSlice";
import {configureStore} from "../rtk-nut";


export default configureStore({reducer:{counter: countReducer}})