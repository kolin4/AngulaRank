import React from 'react';
import Wraper from '../wraper';
import img from '../../images/logo_GitHub.jpg';
class Form extends React.Component {

    render(){
        
        let style = {
            user: {},
            password :{},
            
        }
        if ( this.props.isTouched) {
            style = {
                user : {
                    border : this.props.userValid ? '2px solid green' :  '2px solid red' ,
                    outline : 'none'
                },
                password :{
                    border : this.props.passValid ? '2px solid green' :  '2px solid red' ,
                    outline : 'none'
                },
              
                
            }
        }
        if (this.props.errorLogin){
            style = {
                user: {
                    border : '2px solid red',
                    outline: 'none'
                },
                password : {
                    border : '2px solid red',
                    outline: 'none'
                },
                error :{
                    color : 'red',
                    fontWeight : 'bold'
                }
            }
        }

        return (
            <Wraper>
                <div className='title'>
                    
                    <div>
                        <img alt='git' src={img}/>
                    </div>
                    <h3>Log in with github account</h3>
                </div>
                <form onSubmit={this.props.logSumbit} >
                    {this.props.errorLogin ? <span style={style.error}>Wrong login or password!</span> : null}
                    <label htmlFor='username' >Username:</label>
                    <input style={style.user} onClick={this.props.touchedFunc} onChange={this.props.changeHandler} type='text' id='username' />
                    <label htmlFor='password'>Password:</label>
                    <input style={style.password} onClick={this.props.touchedFunc} onChange={this.props.changeHandler} type='password' id='password' />          
                    <button disabled={!this.props.isValid} type='submit'>Log in</button>
                </form>
             </Wraper>
        )
    }
}


export default Form;