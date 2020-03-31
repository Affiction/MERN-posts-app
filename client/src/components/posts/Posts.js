import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getPosts, deleteCommentFromPost, deletePost } from '../../actions';
import PostItem from './PostItem';
import PostForm from './PostForm';

const Posts = ({
  getPosts,
  posts: { loading, posts },
  user,
  deletePost,
  deleteCommentFromPost
}) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

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

      {loading ? (
        <span>Loading...</span>
      ) : (
        posts.map(post => (
          <PostItem
            key={post._id}
            {...post}
            authUser={user}
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
  deleteCommentFromPost,
  deletePost
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
