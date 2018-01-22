const initialState = {
    isLogged: false,
    user:{}
}

const reducer = (state = initialState,action) =>{
        if (action.type === 'logout'){
            localStorage.removeItem('user');
            localStorage.removeItem('auth');     
            return {
                isLogged : false,
                user :{}
            }
        }
    
    let key = localStorage.getItem('auth');
    let user = JSON.parse(localStorage.getItem('user'));

        if ( key !== null) {
           
            
            return {
                isLogged:true,
                user
            }
        }
        if (action.type === 'logIn'){
    
            let user = {
                imgUrl: action.user.avatar_url,
                login: action.user.login
            }
                
            return {
                isLogged : true,
                user,
            }
        }
        return state
}


export default reducer;

