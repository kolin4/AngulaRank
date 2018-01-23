import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import  headerReducer from './store/reducers/headerReducer';
import loginReducer from './store/reducers/loginReducer';
import userDetailsReducer from './store/reducers/userDetailsReducer';
import repositoryDetailsReducer from './store/reducers/repositoryDetailsReducer';
import errorReducer from './store/reducers/error';

const reducer = combineReducers({
    header : headerReducer,
    logged: loginReducer,
    userDetails: userDetailsReducer,
    repositoryReducer : repositoryDetailsReducer,
    error: errorReducer
})

const store = createStore(reducer)


ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
