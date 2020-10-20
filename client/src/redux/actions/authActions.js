import axios from "axios";
import { AUTH_ERROR, REGISTER_SUCCESS, USER_LOADED, LOGIN_SUCCESS, LOGOUT } from "./types";
import setTokenToHeader from "../utils/setTokenToHeader";

// Register user
export const register = ({ name, email, password }) => async (dispatch) => {
  try {
    const res = await axios.post("/api/user", { name, email, password });
    console.log(res);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
    console.log(error.response.message);
  }
};

// Login user
export const login = ({ email, password }) => async (dispatch) => {
  try {
    const res = await axios.post("/api/auth", { email, password });

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Load user
export const loadUser = () => async (dispatch) => {
  try {
    setTokenToHeader(localStorage.token);

    const res = await axios.get("/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};


// Logout
export const logout = () => ({
  type: LOGOUT
})
