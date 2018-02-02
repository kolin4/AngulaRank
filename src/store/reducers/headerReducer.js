const initialState = {
    menuShowed: false
}

const reducer = (state = initialState,action) =>{
    if (action.type === 'showMenu'){

        
        return {
            menuShowed: !state.menuShowed
        }
    }
    return state
}


export default reducer;