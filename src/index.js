import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.jsx";
// import { Provider } from 'react-redux'
import store from "./store";
import {Provider} from "./react-redux-nut/react-redux-nut";

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById("root"));
