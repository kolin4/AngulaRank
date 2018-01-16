import React, { Component } from 'react';
import './App.css';

import Contributors from './components/main/contributors';
import Header from './components/header/Header';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Contributors />
      </div>
    );
  }
}

export default App;
