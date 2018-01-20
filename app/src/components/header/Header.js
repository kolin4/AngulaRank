import React from 'react';
import Wraper from '../wraper'
import Backdrop from './backdrop';
import Logo from './logo';
import BurgerClick from './burgerClick';

import {NavLink}  from 'react-router-dom';
import {connect} from 'react-redux';

class Header extends React.Component {
  
 
    render(){

        
        return (
        <Wraper>
   
            <header className='header' >  
            <Backdrop menuShowed={this.props.menuShowed} show={this.props.showMenu}/>  
                <div
                    onClick={this.props.showMenu}
                    style={{
                        backgroundColor  : this.props.menuShowed ? 'white' : 'transparent',
                        transform : this.props.menuShowed ? 'rotate(180deg)' : 'rotate(0)' ,
                    }}
                    className='burger-icon'
                    >

                    <BurgerClick />

                    </div>
                    <Logo class='logo burgerLogo'/>
                <nav style={{
                            transform : this.props.menuShowed ? 'translateX(0)' : 'translateX(100vw)',
                            opacity  : this.props.menuShowed ? '1' : '0'
                        }}
                        className='menuBurger'>
                    <ul>
                        <NavLink exact activeClassName='activeLink' className='burgerLink' to='/'><li onClick={this.props.showMenu}>Home</li></NavLink>                      
                         {this.props.isLoged ? <NavLink activeClassName='activeLink' className='burgerLink'  to='/contributors'><li onClick={this.props.showMenu}>Contributors</li></NavLink> : null}  
                  
 
                    </ul>
                </nav>            
                <div className='container  normalMenu'>
                    <Logo class='logo'/>
                    <nav className='normalMenuList'>
                        <ul>
                        <NavLink exact  className='normalLi' to='/'><li>Home</li></NavLink>
                        {this.props.isLoged ? <NavLink   className='normalLi'  to='/contributors'><li>Contributors</li></NavLink> : null }
                        </ul>
                    </nav>    
                </div>
            </header>

        </Wraper>
        )
    }
}
const mapStateToProps = state =>{
    return {
        menuShowed:state.header.menuShowed,
        isLoged : state.logged.isLoged
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        showMenu :()=> dispatch({type:'showMenu'})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Header);

