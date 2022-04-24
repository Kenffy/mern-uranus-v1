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

export const loadInCommingData = async(dispatch) =>{
  dispatch({type: "ACTION_START"});
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const msg = await api.getNewMessages(user.accessToken);
    const noties = await api.getNotifications(user.accessToken); 
    if(msg.data && noties.data){
      dispatch({ type: "FETCH_SUCCESS", payload: {messages: msg.data, notifications: noties.data}});
    } 
  } catch (err) {
    dispatch({ type: "FETCH_FAILED" });
  }
};


export const pushNotifications = async (dispatch, noti) => {
  dispatch({ type: "ACTION_START" });
  try {
    dispatch({ type: "PUSH_SUCCESS", payload: noti});
  } catch (error) {
    dispatch({ type: "ACTION_FAILED" });
  }
}

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

const createNotifications = (socket, friends, link, author, title, target)=>{
  // Notify user
  const creds = JSON.parse(localStorage.getItem("user"));
  let notifications = [];
  for(const friend of friends){
    const noti = {
      sender: creds.id,
      receiver: friend,
      message: "added a new post.",
      text: title,
      authorId: author,
      link,
      target,
    }

    notifications.push(noti)
  }
  if(notifications.length > 0){
      const res_noti = api.createNotification(notifications, creds.accessToken);
      if(res_noti?.status === 200){
      socket.emit("sendNotifications", notifications);
      }
  }
  
}

export const createPost = async (dispatch, post, data, socket, friends) => {
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
      const res = await api.createPost(post, user.accessToken);
      if(res.data){
        createNotifications(socket, friends, res.data.postId, res.data.userId, post.data.title, "post-create");
        res.data && dispatch({ type: "ACTION_SUCCESS"});
      }
      
  } catch (err) {
      dispatch({ type: "ACTION_FAILED" });
  }
};

export const updatePost = async (dispatch, post, data) => {
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
        post.audios[0] = {
          filename: data.audio.filename,
          type: data.audio.type,
          cover: data.audio?.image? data.audio?.image.filename : ""};
        await api.uploadPostAudio(f_data, user.accessToken);
      }
      const res = await api.updatePost(post._id, post, user.accessToken);
      res.data && dispatch({ type: "ACTION_SUCCESS"});
  } catch (err) {
      dispatch({ type: "ACTION_FAILED" });
  }
};

export const UpdateCoverProfile = async(dispatch, currUser, data)=>{
  dispatch({ type: "ACTION_START" });
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const f_data =new FormData();
    f_data.append("name", data.filename);
    f_data.append("file", data.file);
    if(data?.type === "Cover"){
      await api.uploadCover(f_data, user.accessToken);
      currUser.cover = data.filename;
    }else{
      await api.uploadProfile(f_data, user.accessToken);
      currUser.profile = data.filename;
    }

    const res = await api.updateUser(currUser._id, currUser, user.accessToken);
    res.data && dispatch({ type: "ACTION_SUCCESS"});
  } catch (error) {
    dispatch({ type: "ACTION_FAILED" });
  }
};

export const UpdateUserData = async(dispatch, currUser, data)=>{
  dispatch({ type: "ACTION_START" });
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if(data?.cover !== null){
      const f_data =new FormData();
      f_data.append("name", data.cover.filename);
      f_data.append("file", data.cover.file);
      await api.uploadCover(f_data, user.accessToken);
      currUser.cover = data.cover.filename;
    }
    if(data?.profile !== null){
      const f_data =new FormData();
      f_data.append("name", data.profile.filename);
      f_data.append("file", data.profile.file);
      await api.uploadProfile(f_data, user.accessToken);
      currUser.profile = data.profile.filename;
    }
    const res = await api.updateUser(currUser._id, currUser, user.accessToken);
    res.data && dispatch({ type: "ACTION_SUCCESS"});
  } catch (error) {
    dispatch({ type: "ACTION_FAILED" });
  }
};

export const sendMessage = async (dispatch, message, data) => {
  dispatch({ type: "ACTION_START" });
  try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (data.images.length > 0) {
        data.images.forEach(async(image)=>{
          const f_data =new FormData();
          f_data.append("name", image.filename);
          f_data.append("file", image.file);
          //message.images.push(image.filename);
          await api.uploadMessageImage(f_data, user.accessToken);
        });
      }
      if(data.video !== null){
        const f_data =new FormData();
        f_data.append("name", data.video.filename);
        f_data.append("file", data.video.file);
        //message.videos.push(data.video.filename);
        await api.uploadMessageVideo(f_data, user.accessToken);
      }
      if(data.doc !== null){
        const f_data =new FormData();
        f_data.append("name", data.doc.filename);
        f_data.append("file", data.doc.file);
        //message.documents.push(data.doc.filename);
        await api.uploadMessageDoc(f_data, user.accessToken);
      }
      if(data.audio !== null){
        const f_data =new FormData();
        f_data.append("name", data.audio.filename);
        f_data.append("file", data.audio.file);
        // message.audios.push({
        //   filename: data.audio.filename,
        //   type: data.audio.type,
        //   cover: data.audio?.image? data.audio?.image.filename : ""});
        await api.uploadMessageAudio(f_data, user.accessToken);
      }
      const res = await api.createMessage(message, user.accessToken);
      if(res.data){
        dispatch({ type: "ACTION_SUCCESS"});
      }
      return res;
  } catch (err) {
      dispatch({ type: "ACTION_FAILED" });
  }
};
