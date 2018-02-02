import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Form from './form';
import LoggedUser from './loggedUser';


class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password:'',
            touched: false,
            userValid : false,
            passValid : false,
            isValid: false,
            errorLogin : false,
            loginLoading : false
        }
    }
    
    logSumbit = (event)=>{
        event.preventDefault();
        this.setState({
            loginLoading:true
        })
        axios.get('https://api.github.com/user',{         
            auth : {
                username: this.state.username,
                password: this.state.password
            }          
            })
            .then(response =>{

                let user = {
                    imgUrl: response.data.avatar_url,
                    login: response.data.login
                }


                localStorage.setItem('user',JSON.stringify(user));
                   
                let key = response.config.headers.Authorization;
 
                localStorage.setItem('auth', key);
                
                this.props.logIn(user);
                this.setState({
                    loginLoading:false
                })
               
            })
            .catch( error => {
                this.setState({
                    errorLogin: true,
                    loginLoading:false
  
                })
            })

    }
    changeHandler = (event)=>{
        let username = this.state.username;
        let password = this.state.password;
        let isValid = this.state.isValid;
        let userValid = this.state.username;
        let passValid = this.state.passValid;
        
        switch (event.target.id){
            case 'username' :
                username = event.target.value;
                if (username.length > 0 ){
                    userValid = true;
                } else {
                    userValid = false;
                }
                break;
            case 'password' :
                password = event.target.value;
                if (password.length > 6 ){
                    passValid = true;
                } else {
                    passValid = false;
                }
                break;
            default : 
                break;
        }
        if ((userValid) && (passValid)) {
            isValid = true;
        } else {
            isValid = false;
        }
        this.setState({
            username,
            password,
            userValid,
            passValid,
            isValid,
            errorLogin :false
        })
    }

    touched = ()=>{
        this.setState({
            touched:true,
        })
    }
    render () {

        return (
            <div className='container'> 
                <div className='login-content'>
                    <div className='LoginContainer'>
                        <div className='loginBox'>
                    
                            {this.props.isLogged ? <LoggedUser /> : <Form errorLogin={this.state.errorLogin} userValid={this.state.userValid} passValid={this.state.passValid} isValid={this.state.isValid} logSumbit={this.logSumbit} isTouched={this.state.touched} touchedFunc={this.touched} changeHandler={this.changeHandler} />}
                            {!this.state.loginLoading ? null : (
                                    <div className='loading'>
                                        <div className='loading-content'>
                                            <div>
                                                <div className="square" ></div>
                                                <div className="square"></div>
                                                <div className="square last"></div>
                                                <div className="square clear"></div>
                                                <div className="square"></div>
                                                <div className="square last"></div>
                                                <div className="square clear"></div>
                                                <div className="square "></div>
                                                <div className="square last"></div>
                                            </div>
                                        </div>                
                                    </div>

                            )}
                        </div>     
                      
                    </div>
                    
                </div>    
             
            </div>
            
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logIn : (user)=> dispatch({type:'logIn', user:user})
    }
}

const mapStateToProps = state =>{    
    return {
        isLogged: state.logged.isLogged
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);