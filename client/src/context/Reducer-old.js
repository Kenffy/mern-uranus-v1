const Reducer = (state, action) => {
    switch (action.type) {
      case "LOGIN_START":
      case "START_POST":
      case "START_DATA":
      case "START_COMMENT":
      case "UPDATE_START":
      case "START_USER":
      case "LOGOUT_START":
        return {
          ...state,
          isFetching: true,
          error: false,
        };
      case "FOLLOW_START":
      case "UNFOLLOW_START":
        return {
          ...state,
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
      case "LOGIN_FAILURE":
        return {
          ...state,
          user: null,
          isFetching: false,
          error: true,
        };
      case "UPDATE_SUCCESS":
        let currState = state.user;
        currState.username = action.payload.username;
        return {
          ...state,
          user: currState,
          isFetching: false,
          error: false,
        };
      case "FOLLOW_USER_SUCCESS":
      case "UNFOLLOW_USER_SUCCESS":
        return {
          ...state,
          users: [...state.users.filter(u=>u._id !== action.payload._id), action.payload],
          isFetching: false,
          error: false,
        };
      case "UPDATE_FAILURE":
        return {
          ...state,
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
      case "GET_AUTH_USER":
        return {
            ...state,
            auth: action.payload,
            isFetching: false,
            error: false,
        }
      case "GET_ALL_USER":
        return {
            ...state,
            users: action.payload,
            isFetching: false,
            error: false,
        }
      case "GET_ALL_POST":
        return {
            ...state,
            posts: action.payload,
            isFetching: false,
            error: false,
        }
      case "GET_DATA":
        return {
            ...state,
            posts: action.payload.posts,
            users: action.payload.users,
            isFetching: false,
            error: false,
        }
      case "CREATE_POST":
        return {
            ...state,
            posts: [...state.posts, action.payload],
            isFetching: false,
            error: false,
        }
      case "UPDATE_POST":
        return {
            ...state,
            posts: [...state.posts.filter(p=>p._id !== action.payload._id), action.payload],
            isFetching: false,
            error: false,
        }
      case "DELETE_POST":
        return {
            ...state,
            posts: state.posts.filter(p=>p._id !== action.payload),
            isFetching: false,
            error: false,
        }
      case "CREATE_COMMENT_SUCCESS":
        return {
            ...state,
            single: {
              ...state.single,
              comments: action.payload
            },
            isFetching: false,
            error: false,
        }
      case "LIKE_COMMENT":
        return {
          ...state,
          single:{
              ...state.single,
              comments: [...state.single.comments.map(p=>p._id === action.payload._id? action.payload : p)],
            },
            isFetching: false,
            error: false,
        }
      case "GET_SINGLE":
        return {
            ...state,
            posts: [...state.posts.filter(p=>p._id !== action.payload.post._id), action.payload.post],
            single:{
              ...state.single,
              author: action.payload.author,
              user: action.payload.user,
              post: action.payload.post,
              posts: state.posts.filter(p=>p._id !== action.payload.postId && p.userId===action.payload.authorId),
              comments: action.payload.comments,
            },
            isFetching: false,
            error: false,
        }
      case "LIKE_POST":
      case "VUE_POST":
        return {
            ...state,
            posts: [...state.posts.filter(p=>p._id !==action.payload._id), action.payload],
            single: {
              ...state.single,
              post: action.payload,
            },
            isFetching: false,
            error: false,
        }
      case "LOGOUT_FAILED":
      case "REFRESH_FAILED":
      case "FAILED_POST":
      case "FAILED_DATA":
      case "FAILED_COMMENT":
      case "FAILED_USER":
      case "FOLLOW_FAILED":
      case "UNFOLLOW_FAILED":
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
  