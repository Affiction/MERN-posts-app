import React, { useState } from 'react';
import PropTypes from 'prop-types';

import PostUpdateCommentForm from './PostUpdateCommentForm';

const PostComment = ({
  text,
  name,
  user,
  authUser,
  updateComment,
  deleteComment,
  _id: id
}) => {
  const [visible, toggleEdit] = useState(false);

  const toggleUpdateForm = () => {
    toggleEdit(!visible);
  };

  const deleteBtn =
    authUser && authUser._id === user ? (
      <div>
        <button className="button is-text" onClick={e => toggleEdit(!visible)}>
          <i className="fas fa-edit"></i>
        </button>
        <button
          className="delete"
          aria-label="delete"
          onClick={e => deleteComment(id)}
        ></button>
      </div>
    ) : null;

  return (
    <div className="message is-primary">
      <div className="message-header">
        <p>{name}</p>

        {deleteBtn}
      </div>

      <div className="message-body">
        {visible ? (
          <PostUpdateCommentForm
            text={text}
            updateComment={updateComment}
            submitForm={toggleUpdateForm}
          />
        ) : (
          text
        )}
      </div>
    </div>
  );
};

PostComment.propTypes = {
  text: PropTypes.string,
  name: PropTypes.string
};

export default PostComment;
