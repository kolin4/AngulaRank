const initialState = {
    error: false
}

const reducer = (state = initialState,action) =>{
    if (action.type === 'closeError'){

        return {
            error: false
        }
    }
    if (action.type === 'showError'){
        return {
            error: true
        }
    }
    return state
}


export default reducer;