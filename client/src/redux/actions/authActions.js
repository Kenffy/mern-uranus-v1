import * as api from "../../services/apiServices";
import jwt_decode from "jwt-decode";
import { 
    LOGIN_FAILED, 
    LOGIN_START, 
    LOGIN_SUCCESS, 
    REGISTER_FAILED, 
    REGISTER_START, 
    REGISTER_SUCCESS,
    LOGOUT_FAILED, 
    LOGOUT_START, 
    LOGOUT_SUCCESS,
} from "../constants/authTypes";

export const login = async (dispatch, user) => {
  dispatch({type: LOGIN_START});
  try {
    const res = await api.login(user);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    //localStorage.setItem("user", JSON.stringify(res.data ));
  } catch (err) {
    console.log(err);
    dispatch({ type: LOGIN_FAILED });
  }
};

export const register = async (dispatch, user) => {
  dispatch({type: REGISTER_START});
  try {
    await api.register(user);
    dispatch({ type: REGISTER_SUCCESS });
  } catch (err) {
    dispatch({ type: REGISTER_FAILED });
  }
};

export const logout = async (dispatch, user) => {
  dispatch({type: LOGOUT_START});
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
      dispatch({ type: LOGOUT_SUCCESS});
      //localStorage.setItem("user", null);
    }
  } catch (err) {
    dispatch({ type: LOGOUT_FAILED });
  }
};