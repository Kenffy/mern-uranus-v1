import { 
    START_USER, 
    GET_USER,
    GET_ALL_USER, 
    UPDATE_USER,
    DELETE_USER,  
    FAILED_USER} from '../constants/userTypes';

const initialState = {
    users: [],
    selected: null,
    isFetching: false,
    error: false,
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case START_USER: 
            return {
                ...state,
                isFetching: true,
            };
        case GET_USER:
            return {
                ...state,
                selected: state.posts.find(u=>u._id === action.payload),
            };
        case GET_ALL_USER: 
            return {
                ...state,
                users: action.payload,
            };
        case UPDATE_USER:
            return {
                ...state,
                users: state.users.map((user) => user._id === action.payload._id? action.payload : user)
            };
        case DELETE_USER:
            return {
                ...state,
                users: [
                    ...state.users.filter((user)=> user._id !== action.payload)]
            };
        case FAILED_USER:
            return {
                ...state,
                isFetching: false,
                error: true,
            };
      default:
        return state;
    }
  }
  