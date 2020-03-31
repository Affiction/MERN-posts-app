import axios from 'axios';

export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
export const GET_POSTS_FAILURE = 'GET_POSTS_FAILURE';

export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get('/api/posts');

    dispatch({
      type: GET_POSTS_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GET_POSTS_FAILURE
    });
  }
};
