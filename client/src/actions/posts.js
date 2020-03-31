import axios from 'axios';

export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
export const GET_POSTS_FAILURE = 'GET_POSTS_FAILURE';

export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const ADD_POST_COMMENT_SUCCESS = 'ADD_POST_COMMENT_SUCCESS';
export const ADD_POST_COMMENT_FAILURE = 'ADD_POST_COMMENT_FAILURE';

export const UPDATE_POST_COMMENT_SUCCESS = 'UPDATE_POST_COMMENT_SUCCESS';
export const UPDATE_POST_COMMENT_FAILURE = 'UPDATE_POST_COMMENT_FAILURE';

export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const REMOVE_POST_COMMENT_SUCCESS = 'REMOVE_POST_COMMENT_SUCCESS';
export const REMOVE_POST_COMMENT_FAILURE = 'REMOVE_POST_COMMENT_FAILURE';

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

export const updateComment = (
  postId,
  commentId,
  formData
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.put(
      `/api/posts/comment/${postId}/${commentId}`,
      formData,
      config
    );

    dispatch({
      type: UPDATE_POST_COMMENT_SUCCESS,
      payload: { postId, comments: res.data }
    });
  } catch (error) {
    const { statusText, status } = error.response;

    dispatch({
      type: UPDATE_POST_COMMENT_FAILURE,
      payload: { msg: statusText, status }
    });
  }
};

export const deletePost = postId => async dispatch => {
  try {
    const res = await axios.delete(`/api/posts/${postId}`);

    dispatch({
      type: REMOVE_POST_SUCCESS,
      payload: { postId }
    });
  } catch (error) {
    const { statusText, status } = error.response;

    dispatch({
      type: REMOVE_POST_FAILURE,
      payload: { msg: statusText, status }
    });
  }
};

export const deleteCommentFromPost = (postId, commentId) => async dispatch => {
  try {
    const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

    dispatch({
      type: REMOVE_POST_COMMENT_SUCCESS,
      payload: { postId, commentId }
    });
  } catch (error) {
    const { statusText, status } = error.response;

    dispatch({
      type: REMOVE_POST_COMMENT_FAILURE,
      payload: { msg: statusText, status }
    });
  }
};
