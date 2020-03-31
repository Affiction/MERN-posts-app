import {
  REG_SUCCESS,
  REG_FAILURE,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT
} from '../actions';

const initialState = {
  token: localStorage.getItem('token'),
  isAuth: false,
  loading: true,
  user: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REG_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuth: true,
        loading: false
      };

    case REG_FAILURE:
    case GET_USER_FAILURE:
    case LOGIN_FAILURE:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        isAuth: false,
        loading: false,
        token: null
      };

    case GET_USER_SUCCESS:
      return {
        ...state,
        isAuth: true,
        loading: false,
        user: payload
      };

    default:
      return state;
  }
}
