import React from 'react';
import { createContext, useEffect, useReducer } from "react";
import { io } from "socket.io-client";
import Reducer from "./Reducer";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  auth: null,
  socket: io.connect(process.env.REACT_APP_SOCKET) || null,
  messages: [],
  onlines: [],
  notifications:[],
  isFetching: false,
  error: false,
};

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <Context.Provider
      value={{
        user: state.user,
        auth: state.auth,
        socket: state.socket,
        onlines: state.onlines,
        messages: state.messages,
        notifications: state.notifications,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};
