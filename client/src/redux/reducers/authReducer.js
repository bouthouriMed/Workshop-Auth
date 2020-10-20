import { AUTH_ERROR, LOGIN_SUCCESS, LOGOUT, REGISTER_SUCCESS, USER_LOADED } from "../actions/types";

const initialState = {
  loading: true,
  token: localStorage.getItem('token'),
  isAuthentificated: false,
  user: null,
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload);
      return {
        ...state,
        loading: false,
        token: payload,
        isAuthentificated: true,
      };

    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthentificated: false,
        loading: false,
      };

    case USER_LOADED:
      return {
        ...state,
        isAuthentificated: true,
        loading:false,
        user: payload
      }
    default:
      return state;
  }
}
