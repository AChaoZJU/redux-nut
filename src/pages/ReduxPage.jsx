import React, { Component } from "react";
import store from "../store/";

export default class ReduxPage extends Component {
            componentDidMount() {
                // Once store updates, execute the function(argument)
                this.unsubscribe = store.subscribe(() => {
                    this.forceUpdate()
                })
            }

            componentWillUnmount() {
                this.unsubscribe?.()
            }

            add = () => {
                store.dispatch({ type: 'ADD'})
            }

            minus = () => {
                store.dispatch((dispatch, getState) => {
                    setTimeout(() => {
                        dispatch({ type: "MINUS" });
                    }, 1000);
                });
            }

            minusPromise = () => {
                store.dispatch(Promise.resolve({
            type: 'MINUS',
            payload: 100
        }))
    }

  render() {
    return (
      <div>
        <h3>ReduxPage</h3>
        <p>{store.getState()}</p>
          <button onClick={this.add}>Add</button>
          <button onClick={this.minus}>Minus </button>
          <button onClick={this.minusPromise}>Minus </button>
      </div>
    );
  }
}
