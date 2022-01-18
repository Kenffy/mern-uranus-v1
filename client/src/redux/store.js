import { combineReducers } from "@reduxjs/toolkit";
//import { createStore, applyMiddleware, compose } from 'redux';
import { createStore, applyMiddleware } from 'redux';
import authReducer from "./reducers/authReducer";
import userReducer from "./reducers/userReducer";
import postReducer from "./reducers/postReducers";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";


const rootReducer = combineReducers({ 
    user: authReducer,
    users: userReducer,
    posts: postReducer,
  });

const middleware = [thunk];

export const store = createStore(
  rootReducer, 
  composeWithDevTools(applyMiddleware(...middleware))
  //compose(applyMiddleware(thunk))
);

