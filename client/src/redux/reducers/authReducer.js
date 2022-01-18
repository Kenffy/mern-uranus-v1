
import { 
    LOGIN_START, 
    LOGIN_SUCCESS, 
    LOGIN_FAILED,
    REGISTER_START, 
    REGISTER_SUCCESS, 
    REGISTER_FAILED,
    LOGOUT_START, 
    LOGOUT_SUCCESS, 
    LOGOUT_FAILED, } from '../constants/authTypes';

const initialState = {
    currentUser: JSON.parse(localStorage.getItem("user")) || null,
    isFetching: false,
    error: false,
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        // LOGIN
        case LOGIN_START: 
            return {
                ...state,
                isFetching: true,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isFetching: false,
                currentUser: action.payload,
            }
        case LOGIN_FAILED:
            return {
                ...state,
                isFetching: false,
                error: true,
            }
        // REGISTER
        case REGISTER_START: 
            return {
                ...state,
                isFetching: true,
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                isFetching: false,
            }
        case REGISTER_FAILED:
            return {
                ...state,
                isFetching: false,
                error: true,
            }

        // LOGOUT
        case LOGOUT_START: 
            return {
                ...state,
                isFetching: true,
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isFetching: false,
                currentUser: null,
            }
        case LOGOUT_FAILED:
            return {
                ...state,
                isFetching: false,
                error: true,
            }
      default:
        return state;
    }
  }
  