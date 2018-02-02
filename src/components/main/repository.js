import React from 'react';

class Respository extends React.Component{
    render(){
        let repo = this.props.data;
            
        return (
            <div className='repository' onClick={this.props.parseRepositoryData}>
                <p><strong>Name: </strong>{repo.name}</p>  
                <p><strong>Language: </strong>{repo.language}</p>
                <p className='description'><strong>Description: </strong>{repo.description}</p>    
         
            </div>
        )
    }
}

export default Respository;