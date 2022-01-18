import { 
    START_USER,
    UPDATE_USER, 
    DELETE_USER, 
    GET_USER, 
    GET_ALL_USER, 
    FAILED_USER,
} from "../constants/userTypes";
import * as api from "../../services/apiServices";
//import {users} from "../../components/data/userData";

export const getAllUsers = async (dispatch, user) => {
    dispatch({ type: START_USER });
    try {
        const res = await api.getUsers(user.accessTocken);
        dispatch({ type: GET_ALL_USER, payload: res.data});
    } catch (err) {
        dispatch({ type: FAILED_USER });
    }
};

export const getUser = async (dispatch, userId) => {
    dispatch({ type: START_USER });
    try {
        dispatch({ type: GET_USER, userId });
    } catch (err) {
        dispatch({ type: FAILED_USER });
    }
};

export const updateUser = async (dispatch, user, token) => {
    dispatch({ type: START_USER });
    try {
        // find user and update
        await api.updateUser(user._id, user, token);
        dispatch({ type: UPDATE_USER, payload: user});
    } catch (err) {
        console.log(err)
        dispatch({ type: FAILED_USER });
    }
};

export const removeUser = async (dispatch, userId) => {
    dispatch({ type: START_USER });
    try {
        dispatch({ type: DELETE_USER, payload: userId});
    } catch (err) {
        dispatch({ type: FAILED_USER });
    }
};

export const follow = async (dispatch, user, currUser, token) => {
    dispatch({ type: START_USER });
    try {
        await api.followUser(user._id, token);
        dispatch({ type: UPDATE_USER, payload: user});
        dispatch({ type: UPDATE_USER, payload: currUser});
    } catch (err) {
        dispatch({ type: FAILED_USER });
    }
};

export const unfollow = async (dispatch, user, currUser, token) => {
    dispatch({ type: START_USER });
    try {
        await api.unfollowUser(user._id, token);
        dispatch({ type: UPDATE_USER, payload: user});
        dispatch({ type: UPDATE_USER, payload: currUser});
    } catch (err) {
        dispatch({ type: FAILED_USER });
    }
};

  