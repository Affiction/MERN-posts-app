import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  getPosts,
  addCommentToPost,
  updateComment,
  deleteCommentFromPost,
  deletePost
} from '../../actions';
import PostItem from './PostItem';
import PostForm from './PostForm';

const Posts = ({
  getPosts,
  posts: { loading, posts },
  user,
  addCommentToPost,
  updateComment,
  deletePost,
  deleteCommentFromPost
}) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const handleAddComment = (postId, formData) => {
    addCommentToPost(postId, formData);
  };

  const handleUpdateComment = (postId, commentId, formData) => {
    updateComment(postId, commentId, formData);
  };

  const handleDeletePost = postId => {
    deletePost(postId);
  };

  const handleDeleteComment = (postId, commentId) => {
    deleteCommentFromPost(postId, commentId);
  };

  return (
    <Fragment>
      <h1 className="title has-text-centered">Posts</h1>

      <PostForm />

      {loading && !user ? (
        <span>Loading...</span>
      ) : (
        posts.map(post => (
          <PostItem
            key={post._id}
            {...post}
            authUser={user}
            addComment={handleAddComment}
            updateComment={handleUpdateComment}
            deletePost={handleDeletePost}
            deleteComment={handleDeleteComment}
          />
        ))
      )}
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  posts: state.posts,
  user: state.auth.user
});

const mapDispatchToProps = {
  getPosts,
  addCommentToPost,
  deleteCommentFromPost,
  deletePost,
  updateComment
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
