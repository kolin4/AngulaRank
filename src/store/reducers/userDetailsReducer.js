const initialState = {
    userData: {}
}



const reducer = (state = initialState,action) =>{
    if (action.type === 'UserData'){

        return {
            userData : action.elem
        }
        
    }
    return state
}

export  default reducer;