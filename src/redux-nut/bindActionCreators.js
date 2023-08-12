function bindActionCreator(creator, dispatch) {
    return (...args) => dispatch(creator(...args))
}


export default function bindActionCreators(creators, dispatch) {
    let dispatchActionProps = {}

    for(const key in creators) {
        dispatchActionProps[key] = bindActionCreator(creators[key], dispatch)
    }

    return dispatchActionProps
}