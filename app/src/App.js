import React, { Component } from 'react';
import './App.css';
import { Route,BrowserRouter} from 'react-router-dom';
import { connect } from 'react-redux';

import Contributors from './components/main/contributors';
import Header from './components/header/Header';
import Login from './components/login/login';


class App extends Component {
  render() {
    console.log(this.props.isLoged);
    
    return (
      <BrowserRouter >
        <div className="App">
          <Header />
          <Route exact path='/' component={Login} />
           {this.props.isLoged ? <Route exact path='/contributors' component={Contributors} /> : null} 

        </div>
      </BrowserRouter>  
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoged : state.logged.isLoged
  }
}

export default connect(mapStateToProps,null)(App);
