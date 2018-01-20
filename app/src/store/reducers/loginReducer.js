const initialState = {
    isLoged: false
}

const reducer = (state = initialState,action) =>{
    console.log('reducer');
    
    if (action.type === 'logIn'){
        console.log('LOG IN');
              
        return {
            isLoged : true
        }
    }
    return state
}


export default reducer;

