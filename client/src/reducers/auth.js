import { REG_SUCCESS, REG_FAILURE } from '../actions';

const initialState = {
  token: localStorage.getItem('token'),
  isAuth: null,
  loading: true,
  user: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REG_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuth: true,
        loading: false
      };

    case REG_FAILURE:
      localStorage.removeItem('token');
      return {
        ...state,
        isAuth: false,
        loading: false,
        token: null
      };

    default:
      return state;
  }
}
