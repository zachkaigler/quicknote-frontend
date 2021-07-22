import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { combineReducers, createStore } from 'redux';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

let initUserState = {
  user: null,
  notes: []
}

function userReducer(state = initUserState, action) {
  switch (action.type) {
    case "SET_USER":
      console.log(action.payload)
      return {
        ...state,
        user: action.payload
      }
    case "SET_NOTES":
      return {
        ...state,
        notes: action.payload
      }
    default:
      return state
  }
}

let allReducers = {
  userReducer
}

let rootReducer = combineReducers(allReducers)

let storeObj = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
  <BrowserRouter>
    <Provider store={storeObj}>
      <App />
    </Provider>
  </BrowserRouter>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
