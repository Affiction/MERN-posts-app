import axios from 'axios';

import { setAlert } from '../actions';
import { axiosHeaderToken } from '../utils';

export const REG_SUCCESS = 'REG_SUCCESS';
export const REG_FAILURE = 'REG_FAILURE';

export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILURE = 'GET_USER_FAILURE';

export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const data = JSON.stringify({ name, email, password });

    const res = await axios.post('/api/users', data, config);

    dispatch({
      type: REG_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach(error => {
        dispatch(setAlert(error.msg, 'is-danger', 10000));
      });
    }

    dispatch({
      type: REG_FAILURE
    });
  }
};

export const getUser = () => async dispatch => {
  const token = localStorage.getItem('token');

  if (token != null) {
    axiosHeaderToken(token);
  }

  try {
    const res = await axios.get('/api/auth');

    dispatch({
      type: GET_USER_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GET_USER_FAILURE
    });
  }
};
