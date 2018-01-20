import React from 'react';
import { connect } from 'react-redux';

class Login extends React.Component{
    render () {
        return (
            <div className='container'> 
                <div className='LoginContainer'>
                    <button onClick={this.props.logIn}>Zaloguj</button>
                </div>
                
            </div>
            
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logIn : ()=> dispatch({type:'logIn'})
    }
}

export default connect(null,mapDispatchToProps)(Login);