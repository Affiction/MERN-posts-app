import React, { useState } from 'react';
import PropTypes from 'prop-types';

import PostComment from './PostComment';
import PostCommentForm from './PostCommentForm';

const PostItem = ({
  text,
  name,
  date,
  comments,
  user,
  _id: id,
  authUser,
  addComment,
  updateComment,
  deletePost,
  deleteComment
}) => {
  const [visible, toggle] = useState(false);

  const toggleMessages = e => {
    e.preventDefault();

    toggle(!visible);
  };

  const cardFooter = (
    <footer className="card-footer">
      <div className="card-footer-item"></div>

      <a href="#" className="card-footer-item" onClick={e => toggleMessages(e)}>
        Show Messages {`(${comments.length})`}
      </a>
    </footer>
  );

  const commentsList = visible && (
    <div className="container">
      <div className="notification">
        {comments.map(comment => (
          <PostComment
            key={comment._id}
            {...comment}
            authUser={authUser}
            updateComment={updateComment.bind(this, id, comment._id)}
            deleteComment={deleteComment.bind(this, id)}
          />
        ))}

        <PostCommentForm addComment={addComment.bind(this, id)} />
      </div>
    </div>
  );

  const deletePostBtn =
    authUser && authUser._id === user ? (
      <button
        className="delete"
        aria-label="delete"
        style={{ position: 'absolute', right: '20px' }}
        onClick={e => deletePost(id)}
      ></button>
    ) : null;

  return (
    <div className="card" style={{ marginBottom: '30px' }}>
      <div className="card-content">
        {deletePostBtn}

        <div className="media">
          <div className="media-content">
            <p className="title is-4">{name}</p>
          </div>
        </div>
        <div className="content">
          {text}

          <br />
          <br />
          <time dateTime={date}>{new Date(date).toDateString()}</time>
        </div>
      </div>

      {cardFooter}

      {commentsList}
    </div>
  );
};

PostItem.propTypes = {
  text: PropTypes.string,
  name: PropTypes.string,
  date: PropTypes.string,
  comments: PropTypes.array.isRequired,
  user: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  addComment: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired
};

export default PostItem;
