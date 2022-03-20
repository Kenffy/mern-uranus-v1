import axios from "axios";
import jwt_decode from "jwt-decode";

const basicUrl = process.env.REACT_APP_API;
//const basicUrl = 'http://localhost:5001/api';
//const basicUrl = 'http://192.168.0.205/api';

export const PostAssets = 'http://192.168.0.205:5000/images/posts/';
export const ProfileAssets = 'http://192.168.0.205:5000/images/profiles/';

export const AxiosJwt = axios.create();

//------auth--------------
export const login = (creds) => axios.post(basicUrl+"/auth/login",{
  email: creds.email,
  password: creds.password,
});

export const register = (creds) => axios.post(basicUrl+"/auth/register",{
  username: creds.username,
  email: creds.email,
  password: creds.password,
});

export const logout = (user) => axios.post(basicUrl+"/auth/logout",{ token:user.refreshToken });

export const refreshToken = (token) => axios.post(basicUrl+"/auth/refresh", {token});


AxiosJwt.interceptors.request.use(
  async (config) => {
      const user = JSON.parse(localStorage.getItem("user"));
      if(!user){
        return config;
      }
      let currentDate = new Date();
      const decodedToken = jwt_decode(user.accessToken);
      if (user && decodedToken.exp * 1000 < currentDate.getTime()) {

        try {
          const res = await refreshToken(user.refreshToken);
          user.accessToken = res.data.accessToken;
          user.refreshToken = res.data.refreshToken;
          localStorage.setItem("user", JSON.stringify(user));
          config.headers["authorization"] = "Bearer " + res.data.accessToken;
          
        } catch (err) {
          console.log(err);
        }
      }
      return config;
  },
  (error) => {
      return Promise.reject(error);
  }
);
//------------------------

//------users-------------

export const getUsers = (search, token) => AxiosJwt.get(`${basicUrl}/users?${search}`,{ headers: { authorization: "Bearer " + token }});
export const getUser = (id,token) => AxiosJwt.get(`${basicUrl}/users/${id}`,{ headers: { authorization: "Bearer " + token }});
export const getFollowers = (id,token) => AxiosJwt.get(`${basicUrl}/users/${id}/followers`,{ headers: { authorization: "Bearer " + token }});
export const getFollowing = (id,token) => AxiosJwt.get(`${basicUrl}/users/${id}/following`,{ headers: { authorization: "Bearer " + token }});
export const updateUser = (id, user, token) => AxiosJwt.put(`${basicUrl}/users/${id}`, user,{ headers: { authorization: "Bearer " + token }});
export const deleteUser = (id,token) => AxiosJwt.delete(`${basicUrl}/users/${id}`,{ headers: { authorization: "Bearer " + token }});
export const followUser = (id,token) => AxiosJwt.put(`${basicUrl}/users/${id}/follow`, {userId: id}, { headers: { authorization: "Bearer " + token }});
export const unfollowUser = (id,token) => AxiosJwt.put(`${basicUrl}/users/${id}/unfollow`, {userId: id}, { headers: { authorization: "Bearer " + token }});
export const uploadCover = (data, token) => AxiosJwt.post(`${basicUrl}/upload/covers`, data,{ headers: { authorization: "Bearer " + token }});
export const uploadProfile = (data, token) => AxiosJwt.post(`${basicUrl}/upload/profiles`, data,{ headers: { authorization: "Bearer " + token }});
//------------------------

//------posts-------------

export const getPost = (id, token) => AxiosJwt.get(`${basicUrl}/posts/${id}`,{ headers: { authorization: "Bearer " + token }});
export const getPosts = (search, token) => AxiosJwt.get(`${basicUrl}/posts?${search}`,{ headers: { authorization: "Bearer " + token }});
//export const likePost = (id) => axios.put(`${basicUrl}/posts/${id}/like`);
export const likePost = (id, token) => AxiosJwt.put(`${basicUrl}/posts/${id}/like`, {postId: id},{ headers: { authorization: "Bearer " + token }});
export const vuePost = (id, token) => AxiosJwt.put(`${basicUrl}/posts/${id}/vue`, {postId: id},{ headers: { authorization: "Bearer " + token }});
export const createPost = (post, token) => AxiosJwt.post(`${basicUrl}/posts/`, post,{ headers: { authorization: "Bearer " + token }});
export const updatePost = (id, post, token) => AxiosJwt.put(`${basicUrl}/posts/${id}`, post,{ headers: { authorization: "Bearer " + token }});
export const deletePost = (id, token) => AxiosJwt.delete(`${basicUrl}/posts/${id}`,{ headers: { authorization: "Bearer " + token }});
export const uploadPost = (data, token) => AxiosJwt.post(`${basicUrl}/upload/posts`, data,{ headers: { authorization: "Bearer " + token }});
//------------------------

//------conversations-------------
export const getChat = (id, token) => AxiosJwt.get(`${basicUrl}/conversations/unique/${id}`,{ headers: { authorization: "Bearer " + token }});
export const getChatByIds = (id1, id2, token) => AxiosJwt.get(`${basicUrl}/conversations/usr1${id1}/usr2${id2}`,{ headers: { authorization: "Bearer " + token }});
export const getChats = (id, token) => AxiosJwt.get(`${basicUrl}/conversations/${id}`,{ headers: { authorization: "Bearer " + token }});
export const createChat = (chat, token) => AxiosJwt.post(`${basicUrl}/conversations/`, chat,{ headers: { authorization: "Bearer " + token }});
//------------------------

//------messages-------------
export const getMessage = (id, token) => AxiosJwt.get(`${basicUrl}/messages/${id}`,{ headers: { authorization: "Bearer " + token }});
export const getMessages = (id, token) => AxiosJwt.get(`${basicUrl}/messages/chat/${id}`,{ headers: { authorization: "Bearer " + token }});
export const createMessage = (message, token) => AxiosJwt.post(`${basicUrl}/messages/`, message,{ headers: { authorization: "Bearer " + token }});
export const deleteMessage = (id, token) => AxiosJwt.delete(`${basicUrl}/messages/${id}`,{ headers: { authorization: "Bearer " + token }});
export const updateMessages = (id, message, token) => AxiosJwt.put(`${basicUrl}/messages/${id}`, message,{ headers: { authorization: "Bearer " + token }});
//------------------------

//------categories-------------
export const getCategories = () => axios.get(`${basicUrl}/categories/`);
export const CreateCategory = (category) => axios.post(`${basicUrl}/categories/`, category);
//------------------------

//------comments-------------
export const getComment = (id, token) => AxiosJwt.get(`${basicUrl}/comments/${id}`,{ headers: { authorization: "Bearer " + token }});
export const getComments = (id,token) => AxiosJwt.get(`${basicUrl}/comments/${id}/post`,{ headers: { authorization: "Bearer " + token }});
export const likeComment = (id, token) => AxiosJwt.put(`${basicUrl}/comments/${id}/like`, {commentId: id}, { headers: { authorization: "Bearer " + token }});
export const createComment = (comment, token) => AxiosJwt.post(`${basicUrl}/comments/`, comment, { headers: { authorization: "Bearer " + token }});
export const updateComment = (id, comment, token) => AxiosJwt.put(`${basicUrl}/comments/${id}`,comment,{ headers: { authorization: "Bearer " + token }});
export const deleteComment = (id, token) => AxiosJwt.delete(`${basicUrl}/comments/${id}`,{ headers: { authorization: "Bearer " + token }});
//------------------------

//------replies-------------
export const getReply = (id, token) => AxiosJwt.get(`${basicUrl}/replies/${id}`,{ headers: { authorization: "Bearer " + token }});
export const getReplies = (id,token) => AxiosJwt.get(`${basicUrl}/replies/${id}/comment`,{ headers: { authorization: "Bearer " + token }});
export const likeReply = (id, token) => AxiosJwt.put(`${basicUrl}/replies/${id}/like`, {replyId: id}, { headers: { authorization: "Bearer " + token }});
export const createReply = (reply, token) => AxiosJwt.post(`${basicUrl}/replies/`, reply, { headers: { authorization: "Bearer " + token }});
export const updateReply = (id, reply, token) => AxiosJwt.put(`${basicUrl}/replies/${id}`, reply,{ headers: { authorization: "Bearer " + token }});
export const deleteReply = (id, token) => AxiosJwt.delete(`${basicUrl}/replies/${id}`,{ headers: { authorization: "Bearer " + token }});
//------------------------

//------uploads-----------
export const uploadCoverImage = (data, token) => AxiosJwt.post(`${basicUrl}/upload/covers`, data, { headers: { authorization: "Bearer " + token }});
export const uploadAudioCoverImage = (data, token) => AxiosJwt.post(`${basicUrl}/upload/audio-covers`, data, { headers: { authorization: "Bearer " + token }});
export const uploadProfileImage = (data, token) => AxiosJwt.post(`${basicUrl}/upload/profiles`, data, { headers: { authorization: "Bearer " + token }});
export const uploadPostImage = (data, token) => AxiosJwt.post(`${basicUrl}/upload/posts`, data, { headers: { authorization: "Bearer " + token }});
export const uploadPostVideo = (data, token) => AxiosJwt.post(`${basicUrl}/upload/videos`, data, { headers: { authorization: "Bearer " + token }});
export const uploadPostAudio = (data, token) => AxiosJwt.post(`${basicUrl}/upload/audios`, data, { headers: { authorization: "Bearer " + token }});
export const uploadMessageImage = (data, token) => AxiosJwt.post(`${basicUrl}/messages/images`, data, { headers: { authorization: "Bearer " + token }});
export const uploadMessageVideo = (data, token) => AxiosJwt.post(`${basicUrl}/messages/videos`, data, { headers: { authorization: "Bearer " + token }});
export const uploadMessageAudio = (data, token) => AxiosJwt.post(`${basicUrl}/messages/audios`, data, { headers: { authorization: "Bearer " + token }});
export const uploadMessageDoc = (data, token) => AxiosJwt.post(`${basicUrl}/messages/documents`, data, { headers: { authorization: "Bearer " + token }});
