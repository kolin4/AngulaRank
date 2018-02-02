const initialState = {
    parseRepositoryData : [],
}

const reducer = (state=initialState, action) =>{
 
    if (action.type === 'parseRepositoryData'){

        return {
            parseRepositoryData : action.repoData
        }
        
    }

    return state;
}


export default reducer;