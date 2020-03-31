import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getPosts } from '../../actions';
import PostItem from './PostItem';

const Posts = ({ getPosts, posts: { loading, posts } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <Fragment>
      <h1 className="title has-text-centered">Posts</h1>

      {loading ? (
        <span>Loading...</span>
      ) : (
        posts.map(post => <PostItem key={post._id} {...post} />)
      )}
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  posts: state.posts
});

export default connect(mapStateToProps, { getPosts })(Posts);
