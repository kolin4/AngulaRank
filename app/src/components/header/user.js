import React from 'react';
import Wraper from '../wraper.js'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class User extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userClicked : false
        }
    }
    showUserInfo = (event)=>{    
        this.setState({
            userClicked : !this.state.userClicked
        })
    }
    render (){
        
        let style = {
            display : this.state.userClicked ? 'block' : 'none' 
        }
        
        return (
            <Wraper>
                {this.state.userClicked ? <div  onClick={this.showUserInfo} className='modal'></div> : null}
                <div onClick={this.showUserInfo} className={this.props.class}>
                    <img alt='userImg' className='user-img' src={this.props.userData.imgUrl}/>
                    <div className='arrow'></div>
                    
                </div>
                <div style={style} className='userInfo'>
                <ul>
                    <li className='name'>Hi {this.props.userData.login}</li>
                    <Link to='/'><li onClick={this.props.logout} className='logout'>Sign out</li></Link>
                </ul>
         
                </div>
            </Wraper>    
        )
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        logout : ()=> dispatch({type:'logout'})
    }
}


export default connect(null,mapDispatchToProps)(User);