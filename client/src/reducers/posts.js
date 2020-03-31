import {
  GET_POSTS_SUCCESS,
  GET_POSTS_FAILURE,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE
} from '../actions';

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        posts: payload,
        loading: false
      };

    case GET_POSTS_FAILURE:
      return {
        ...state,
        error: payload,
        loading: false
      };

    case ADD_POST_SUCCESS:
      return {
        ...state,
        posts: [...state.posts, payload],
        loading: false
      };

    default:
      return state;
  }
}
