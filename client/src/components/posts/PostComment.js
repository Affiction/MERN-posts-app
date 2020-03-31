import React from 'react';
import PropTypes from 'prop-types';

const PostComment = ({ text, name, user, authUser }) => {
  const deleteBtn =
    authUser && authUser._id === user ? (
      <button className="delete" aria-label="delete"></button>
    ) : null;

  return (
    <div className="message is-primary">
      <div className="message-header">
        <p>{name}</p>

        {deleteBtn}
      </div>
      <div className="message-body">{text}</div>
    </div>
  );
};

PostComment.propTypes = {
  text: PropTypes.string,
  name: PropTypes.string
};

export default PostComment;
