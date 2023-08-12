import { Component} from 'react'
// import {connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
import store from "../store";
import bindActionCreators from "../redux-nut/bindActionCreators";
import {connect} from "../react-redux-nut/react-redux-nut";

const mapStateToProps = ({count}, ownProps) => ({count})
const mapDispatchToProps = {add: () => ({type:'ADD'})}
// const mapDispatchToProps = (dispatch) => ({add: () => dispatch({type:'ADD'})})
// const mapDispatchToProps = (dispatch) => {
//     return {
//         dispatch,
//         ...bindActionCreators({add: () => ({type:'ADD'})}, dispatch)
//     }
// }

// HOC: component => component
export const HOC = connect(mapStateToProps, mapDispatchToProps)
export default HOC(class ReactReduxPage extends Component{
    render() {
        console.log(this.props )
        return (
            <div>
                <h3>ReactReduxPage</h3>
                {/*<button onClick={() => this.props.dispatch({type:'ADD'})}>{this.props.count}</button>*/}
                <button onClick={this.props.add} >{this.props.count}</button>
            </div>
        );
    }
})
