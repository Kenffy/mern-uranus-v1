import { 
    START_COMMENT,
    CREATE_COMMENT,
    UPDATE_COMMENT, 
    DELETE_COMMENT, 
    GET_COMMENT, 
    GET_ALL_COMMENT,
    FAILED_COMMENT,
} from "../constants/comTypes";
//import {posts} from "../../components/data/postData";
import * as api from "../../services/apiServices";

export const getCommentsByPostId = async (postId, token, dispatch) => {
    dispatch({ type: START_COMMENT });
    try {
        const res = await api.getComments(postId, token);
        dispatch({ type: GET_ALL_COMMENT, payload: res.data });
        console.log(res.data);
    } catch (err) {
        console.log(err)
        dispatch({ type: FAILED_COMMENT });
    }
};

export const getAllComments = async (dispatch) => {
    dispatch({ type: START_COMMENT });
    try {
        const res = await api.getComments();
        dispatch({ type: GET_ALL_COMMENT, payload: res.data });
    } catch (err) {
        dispatch({ type: FAILED_COMMENT });
    }
};

export const getComment = async (dispatch, comId) => {
    dispatch({ type: START_COMMENT });
    try {
        dispatch({ type: GET_COMMENT, payload: comId });
    } catch (err) {
        dispatch({ type: FAILED_COMMENT });
    }
};

export const createComment = async (dispatch, com, token) => {
    dispatch({ type: START_COMMENT });
    try {
        const res = await api.createComment(com, token)
        dispatch({ type: CREATE_COMMENT, payload: res.data});
    } catch (err) {
        dispatch({ type: FAILED_COMMENT });
    }
};

export const updateComment = async (dispatch, com, user) => {
    dispatch({ type: START_COMMENT });
    try {
        // find user and update
        const res = await api.updateComment(com._id, com, user.accessTocken);
        dispatch({ type: UPDATE_COMMENT, payload: res.data});
    } catch (err) {
        dispatch({ type: FAILED_COMMENT });
    }
};

export const deleteComment = async (dispatch, comId, user) => {
    dispatch({ type: START_COMMENT });
    try {
        await api.deleteComment(comId, user.accessTocken);
        dispatch({ type: DELETE_COMMENT, payload: comId});
    } catch (err) {
        dispatch({ type: FAILED_COMMENT });
    }
};

export const likeComment = async (dispatch, com, user) => {
    dispatch({ type: START_COMMENT });
    try {
        await api.likeComment(com._id, user.accessTocken);
        dispatch({ type: UPDATE_COMMENT, payload: com});
    } catch (err) {
        dispatch({ type: FAILED_COMMENT });
    }
};

  