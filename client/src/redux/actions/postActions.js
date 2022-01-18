import { 
    START_POST,
    CREATE_POST,
    UPDATE_POST, 
    DELETE_POST, 
    GET_POST, 
    GET_ALL_POST,
    FAILED_POST,
} from "../constants/postTypes";
import * as api from "../../services/apiServices";

export const getAllPosts = async (dispatch) => {
    dispatch({ type: START_POST });
    try {
        const res = await api.getPosts();
        dispatch({ type: GET_ALL_POST, payload: res.data });
    } catch (err) {
        dispatch({ type: FAILED_POST });
    }
};

export const getPost = async (dispatch, postId) => {
    dispatch({ type: START_POST });
    try {
        dispatch({ type: GET_POST, payload: postId });
    } catch (err) {
        dispatch({ type: FAILED_POST });
    }
};

export const setCurrentPost = async (dispatch, postId, user) => {
    dispatch({ type: START_POST });
    try {
        
        console.log("set current post")
        dispatch({ type: GET_POST, payload: postId });
    } catch (err) {
        dispatch({ type: FAILED_POST });
    }
};

export const createPost = async (dispatch, post, token) => {
    dispatch({ type: START_POST });
    try {
        const res = await api.createPost(post, token)
        dispatch({ type: CREATE_POST, payload: res.data});
    } catch (err) {
        dispatch({ type: FAILED_POST });
    }
};

export const updatePost = async (dispatch, post, user) => {
    dispatch({ type: START_POST });
    try {
        // find user and update
        const res = await api.updatePost(post._id, post, user.accessTocken);
        dispatch({ type: UPDATE_POST, payload: res.data});
    } catch (err) {
        dispatch({ type: FAILED_POST });
    }
};

export const deletePost = async (dispatch, postId, user) => {
    dispatch({ type: START_POST });
    try {
        await api.deletePost(postId, user.accessTocken);
        dispatch({ type: DELETE_POST, payload: postId});
    } catch (err) {
        dispatch({ type: FAILED_POST });
    }
};

export const like = async (dispatch, post, user) => {
    dispatch({ type: START_POST });
    try {
        await api.likePost(post._id, user.accessTocken);
        dispatch({ type: UPDATE_POST, payload: post});
    } catch (err) {
        dispatch({ type: FAILED_POST });
    }
};

export const dislike = async (dispatch, post, user) => {
    dispatch({ type: START_POST });
    try {
        const res = await api.updatePost(post._id, post, user.accessTocken);
        dispatch({ type: UPDATE_POST, payload: res.data});
    } catch (err) {
        dispatch({ type: FAILED_POST });
    }
};

  