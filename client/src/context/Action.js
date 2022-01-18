import jwt_decode from "jwt-decode";
import * as api from "../services/apiServices";
//import { delay } from "../util/util";

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

export const getAuthUser = async (dispatch) => {
  dispatch({ type: "ACTION_START" });
  try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await api.getUser(user.id, user.accessToken);
      dispatch({ type: "GET_AUTH_USER", payload: res.data});
  } catch (err) {
      dispatch({ type: "ACTION_FAILED" });
  }
};

export const followUser = async (dispatch, userId) => {
  dispatch({type: "ACTION_START"});
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    await api.followUser(userId, user.accessToken);
    const res = await api.getUser(userId, user.accessToken);
    if(res.data){
      dispatch({ type: "ACTION_SUCCESS"});
      return res.data;
    }
  } catch (err) {
    dispatch({ type: "ACTION_FAILED" });
  }
};

export const unfollowUser = async (dispatch, userId) => {
  dispatch({type: "ACTION_START"});
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    await api.unfollowUser(userId, user.accessToken);
    const res = await api.getUser(userId, user.accessToken);
    if(res.data){
      dispatch({ type: "ACTION_SUCCESS"});
      return res.data;
    }
  } catch (err) {
    dispatch({ type: "ACTION_FAILED" });
  }
};

export const createPost = async (dispatch, post, data) => {
  dispatch({ type: "ACTION_START" });
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
      res.data && dispatch({ type: "ACTION_SUCCESS"});
  } catch (err) {
      dispatch({ type: "ACTION_FAILED" });
  }
};