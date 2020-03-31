import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getPosts, deleteCommentFromPost } from '../../actions';
import PostItem from './PostItem';
import PostForm from './PostForm';

const Posts = ({
  getPosts,
  posts: { loading, posts },
  user,
  deleteCommentFromPost
}) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

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

export default connect(mapStateToProps, { getPosts, deleteCommentFromPost })(
  Posts
);
