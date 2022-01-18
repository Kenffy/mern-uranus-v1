import jwt_decode from "jwt-decode";
import * as api from "../services/apiServices";
import { delay } from "../util/util";

// verify token
export const verifyToken = async(dispatch, user)=>{
    let currentDate = new Date();
    const decodedToken = jwt_decode(user.accessToken);
    const isExpired = (decodedToken.exp * 1000 < currentDate.getTime());
    if (isExpired) {
      console.log("token expired");
      try {
        const res = await api.refreshToken(user.refreshToken);
        user.refreshToken = res.data.refreshToken;
        user.accessToken = res.data.accessToken;
        dispatch({type: "REFRESH_TOKEN", payload: user})
      } catch (err) {
        dispatch({type: "REFRESH_FAILED"})
      } 
    }else{
      console.log("token valid");
    } 
}

// Users
export const login = async (dispatch, user) => {
    dispatch({type: "LOGIN_START"});
    try {
        const res = await api.login(user);
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        //localStorage.setItem("user", JSON.stringify(res.data ));
    } catch (err) {
        console.log(err);
        dispatch({ type: "LOGIN_FAILED" });
    }
};

export const register = async (dispatch, user) => {
    dispatch({type: "REGISTER_START"});
    try {
      await api.register(user);
      dispatch({ type: "REGISTER_SUCCESS" });
    } catch (err) {
      dispatch({ type: "REGISTER_FAILED" });
    }
};

export const logout = async (dispatch, user) => {
    dispatch({type: "LOGOUT_START"});
    try {
      let currentDate = new Date();
      const decodedToken = jwt_decode(user.accessToken);
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        console.log("token expired");
        const res = await api.refreshToken(user.refreshToken);
        user.refreshToken = res.data.refreshToken;
        user.accessToken = res.data.accessToken;
      }
      const res = await api.logout(user);
      if(res.status === 200){
        console.log("call dispatch logout")
        dispatch({ type: "LOGOUT_SUCCESS"});
        //localStorage.setItem("user", null);
      }
    } catch (err) {
      dispatch({ type: "LOGOUT_FAILED" });
    }
};

export const followUser = async (dispatch, userId) => {
  dispatch({type: "FOLLOW_START"});
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    await api.followUser(userId, user.accessToken);
    const res = await api.getUser(userId, user.accessToken);
    dispatch({ type: "FOLLOW_USER_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "FOLLOW_FAILED" });
  }
};

export const unfollowUser = async (dispatch, userId) => {
  dispatch({type: "UNFOLLOW_START"});
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    await api.unfollowUser(userId, user.accessToken);
    const res = await api.getUser(userId, user.accessToken);
    dispatch({ type: "UNFOLLOW_USER_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "UNFOLLOW_FAILED" });
  }
};

export const getAllUsers = async (dispatch) => {
  dispatch({ type: "START_USER" });
  try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await api.getUsers(user.accessToken);
      await delay(1000);
      dispatch({ type: "GET_ALL_USER", payload: res.data});
  } catch (err) {
      dispatch({ type: "FAILED_USER" });
  }
};

export const getAuthUser = async (dispatch, userId) => {
  dispatch({ type: "START_USER" });
  try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await api.getUser(userId, user.accessToken);
      dispatch({ type: "GET_AUTH_USER", payload: res.data});
  } catch (err) {
      dispatch({ type: "FAILED_USER" });
  }
};
// Posts
export const loadData = async(dispatch, search) => {
  dispatch({ type: "START_DATA" });
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const posts = await api.getPosts(search, user.accessToken);
    await delay(1000);
    const users = await api.getUsers(user.accessToken);
    await delay(1000);
    if(users.data && posts.data){
      dispatch({ type: "GET_DATA", payload: {"users": users.data, "posts": posts.data} });
    }
  } catch (err) {
    dispatch({ type: "FAILED_DATA" });
  }
}

export const getAllPosts = async (dispatch, search) => {
  dispatch({ type: "START_POST" });
  try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await api.getPosts(search, user.accessToken);
      await delay(1000);
      dispatch({ type: "GET_ALL_POST", payload: res.data });
  } catch (err) {
      dispatch({ type: "FAILED_POST" });
  }
};

export const loadSingleData = async (dispatch, params) => {
  dispatch({ type: "START_POST" });
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const single = {
      author: {},
      user: {},
      post: {},
      posts: [],
      comments: [],
      userId: params.userId,
      authorId: params.authorId,
      postId: params.postId,
    };

    if(params.authorId === params.userId){
      const res = await api.getUser(params.userId, user.accessToken);
      if(res.data) {
        single.user = res.data;
        single.author = res.data
      };
    }else{
      const res1 = await api.getUser(params.userId, user.accessToken);
      const res2 = await api.getUser(params.authorId, user.accessToken);
      if(res1.data && res2.data) {
        single.user = res1.data;
        single.author = res2.data
      };
    }

    await api.vuePost(params.postId, user.accessToken);

    const res = await api.getComments(params.postId, user.accessToken);
    if(res.data){single.comments = res.data}

    const post_res = await api.getPost(params.postId, user.accessToken);
    if(post_res.data){single.post = post_res.data}

    if(single.user && single.post && single.author && single.comments){
      dispatch({ type: "GET_SINGLE", payload: single });
    }
  } catch (err) {
      dispatch({ type: "FAILED_POST" });
  }
};

export const vuePost = async (dispatch, postId) => {
  console.log("vue called.")
  dispatch({ type: "START_POST" });
  try {
      const user = JSON.parse(localStorage.getItem("user"));
      await api.vuePost(postId, user.accessToken);
      const res = await api.getPost(postId, user.accessToken);
      dispatch({ type: "VUE_POST", payload: res.data});
  } catch (err) {
      dispatch({ type: "FAILED_POST" });
  }
};

export const likePost = async (dispatch, postId) => {
  dispatch({ type: "START_POST" });
  try {
      const user = JSON.parse(localStorage.getItem("user"));
      await api.likePost(postId, user.accessToken);
      const res = await api.getPost(postId, user.accessToken);
      res.data && dispatch({ type: "LIKE_POST", payload: res.data});
  } catch (err) {
      dispatch({ type: "FAILED_POST" });
  }
};

export const createPost = async (dispatch, post, data) => {
  dispatch({ type: "START_POST" });
  try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (data.images.length > 0) {
        data.images.forEach(async(image)=>{
          const f_data =new FormData();
          f_data.append("name", image.filename);
          f_data.append("file", image.file);
          post.images.push(image.filename);
          await api.uploadPostImage(f_data, user.accessToken);
        });
      }
      if(data.video !== null){
        const f_data =new FormData();
        f_data.append("name", data.video.filename);
        f_data.append("file", data.video.file);
        post.videos.push(data.video.filename);
        await api.uploadPostVideo(f_data, user.accessToken);
      }
      if(data.audio !== null){
        if(data.audio?.image !== null){
          const f_data =new FormData();
          f_data.append("name", data.audio.image.filename);
          f_data.append("file", data.audio.image.file);
          await api.uploadAudioCoverImage(f_data, user.accessToken);
        }
        const f_data =new FormData();
        f_data.append("name", data.audio.filename);
        f_data.append("file", data.audio.file);
        post.audios.push({
          filename: data.audio.filename,
          type: data.audio.type,
          cover: data.audio?.image? data.audio?.image.filename : ""});
        await api.uploadPostAudio(f_data, user.accessToken);
      }
      const res = await api.createPost(post, user.accessToken)
      dispatch({ type: "CREATE_POST", payload: res.data});
  } catch (err) {
      dispatch({ type: "FAILED_POST" });
  }
};

export const updatePost = async (dispatch, post) => {
  dispatch({ type: "START_POST" });
  try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await api.updatePost(post._id, post, user.accessToken);
      dispatch({ type: "UPDATE_POST", payload: res.data});
  } catch (err) {
      dispatch({ type: "FAILED_POST" });
  }
};

export const deletePost = async (dispatch, postId) => {
  dispatch({ type: "START_POST" });
  try {
      const user = JSON.parse(localStorage.getItem("user"));
      await api.deletePost(postId, user.accessToken);
      dispatch({ type: "DELETE_POST", payload: postId});
  } catch (err) {
      dispatch({ type: "FAILED_POST" });
  }
};

// comments
export const addComment = async (dispatch, comment) => {
  dispatch({ type: "START_COMMENT" });
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    await api.createComment(comment, user.accessToken);
    const res = await api.getComments(comment.postId, user.accessToken);
      dispatch({ type: "CREATE_COMMENT_SUCCESS", payload: res.data});
  } catch (err) {
      dispatch({ type: "FAILED_COMMENT" });
  }
};

export const likeComment = async (dispatch, commentId) => {
  dispatch({ type: "START_COMMENT" });
  try {
      const user = JSON.parse(localStorage.getItem("user"));
      await api.likeComment(commentId, user.accessToken);
      const res = await api.getComment(commentId, user.accessToken);
      res.data && dispatch({ type: "LIKE_COMMENT", payload: res.data});
  } catch (err) {
      dispatch({ type: "FAILED_COMMENT" });
  }
};