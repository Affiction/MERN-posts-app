import axios from 'axios';

export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
export const GET_POSTS_FAILURE = 'GET_POSTS_FAILURE';

export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const ADD_POST_COMMENT_SUCCESS = 'ADD_POST_COMMENT_SUCCESS';
export const ADD_POST_COMMENT_FAILURE = 'ADD_POST_COMMENT_FAILURE';

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

export const addPost = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/api/posts', formData, config);

    dispatch({
      type: ADD_POST_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    const { statusText, status } = error.response;

    dispatch({
      type: ADD_POST_FAILURE,
      payload: { msg: statusText, status }
    });
  }
};

export const addCommentToPost = (postId, formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(
      `/api/posts/comment/${postId}`,
      formData,
      config
    );

    dispatch({
      type: ADD_POST_COMMENT_SUCCESS,
      payload: { postId, comments: res.data }
    });
  } catch (error) {
    const { statusText, status } = error.response;

    dispatch({
      type: ADD_POST_COMMENT_FAILURE,
      payload: { msg: statusText, status }
    });
  }
};
