import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import  headerReducer from './store/reducers/headerReducer';
import loginReducer from './store/reducers/loginReducer';


const reducer = combineReducers({
    header : headerReducer,
    logged: loginReducer
})

const store = createStore(reducer)


ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
