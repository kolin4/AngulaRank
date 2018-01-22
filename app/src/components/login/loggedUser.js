import React from 'react';
import { connect } from 'react-redux'; 

class LoggedUser extends React.Component{
    render(){
        return (
            <div className='logged'> 
                <img src={this.props.img} alt='user-logo' />
                <h3>Hi {this.props.login}! Nice to see you again!</h3>
                
            </div>
        )
    }
}


const mapStateToProps = state =>{
    
    return {
        login : state.logged.user.login,
        img : state.logged.user.imgUrl
    }
}

export default connect(mapStateToProps)(LoggedUser);