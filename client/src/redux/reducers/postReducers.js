import { 
    START_POST, 
    GET_POST,
    GET_ALL_POST,
    GET_ALL_COMMENT, 
    CREATE_POST,
    UPDATE_POST,
    DELETE_POST,  
    FAILED_POST} from '../constants/postTypes';

const initialState = {
    posts: [],
    selected: null,
    comments: [],
    isFetching: false,
    error: false,
};

export default function postReducer(state = initialState, action) {
    switch (action.type) {
        case START_POST: 
            return {
                ...state,
                isFetching: true,
            };
        case GET_POST: 
            return {
                ...state,
                selected: state.posts.find(p=>p._id === action.payload),
            };
        case GET_ALL_POST: 
            return {
                ...state,
                posts: action.payload,
            };
        case GET_ALL_COMMENT: 
            return {
                ...state,
                comments: action.payload,
            };
        case CREATE_POST:
            return {
                ...state,
                posts: [...state.posts, action.payload]
            };
        case UPDATE_POST:
            return {
                ...state,
                posts: state.posts.map((post) => post._id === action.payload._id? action.payload : post)
            };
        case DELETE_POST:
            return {
                ...state,
                posts: [
                    ...state.posts.filter((post)=> post._id !== action.payload)]
            };
        case FAILED_POST:
            return {
                ...state,
                isFetching: false,
                error: true,
            };
      default:
        return state;
    }
  }
  