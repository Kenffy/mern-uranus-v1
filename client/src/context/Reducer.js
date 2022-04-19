

const Reducer = (state, action) => {
    switch (action.type) {
      case "LOGIN_START":
      case "REGISTER_START":
      case "ACTION_START":
      case "LOGOUT_START":
      case "USER_START":
        return {
          ...state,
          isFetching: true,
          error: false,
        };
      case "LOGIN_SUCCESS":
      case "REFRESH_TOKEN":
        return {
          ...state,
          user: action.payload,
          isFetching: false,
          error: false,
        };
      case "FETCH_SUCCESS":
        return{
          ...state,
          messages: action.payload.messages,
          notifications: action.payload.notifications,
          isFetching: false,
          error: false,
        }
      case "LOGIN_FAILURE":
        return {
          ...state,
          user: null,
          auth: null,
          isFetching: false,
          error: true,
        };
      case "LOGOUT_SUCCESS":
        return {
          ...state,
          user: null,
          isFetching: false,
          error: false,
        };
      case "ACTION_SUCCESS":
        return {
          ...state,
          isFetching: false,
          error: false,
        }
      case "GET_AUTH_USER":
        return {
          ...state,
          auth: action.payload,
          isFetching: false,
          error: false,
        }
      case "LOGOUT_FAILED":
      case "REFRESH_FAILED":
      case "ACTION_FAILED":
      case "FETCH_FAILED":
        return {
            ...state,
            isFetching: false,
            error: true,
        };
      default:
        return state;
    }
  };
  
  export default Reducer;
  