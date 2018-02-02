import React, { Component } from 'react';
import './App.css';
import { Route, HashRouter} from 'react-router-dom';
import { connect } from 'react-redux';

import Contributors from './components/main/contributors';
import Header from './components/header/Header';
import Login from './components/login/login';
import UserDetails from './components/main/UserDetails';
import RepositoryDetails from './components/main/repositoryDetails';
import Error from './components/error';

class App extends Component {
  render() {
    
    return (
      <HashRouter >
        <div className="App">
          <Header />
          <main>
                  
                   <Route exact path='/' component={Login} />
                   {this.props.isLogged ? <Route exact path='/contributors' component={Contributors} /> : null} 
                   {this.props.isLogged ? <Route exact path='/contributors/:id' component={(props)=> <UserDetails match={props} userData={this.props.userDetails}/>} /> : null}
                   {this.props.isLogged ? <Route  path='/contributors/:id/:name' component={(props)=> <RepositoryDetails match={props} repoData={this.props.repoDetails}/>} /> : null}  
                   {this.props.error ? <Error />  : null} 
          </main>
         

        </div>
      </HashRouter>  
    );
  }
}

const mapStateToProps = state => {
  return {
    isLogged : state.logged.isLogged,
    userDetails : state.userDetails.userData,
    repoDetails : state.repositoryReducer.parseRepositoryData,
    error : state.error.error
  }
}

export default connect(mapStateToProps,null)(App);
