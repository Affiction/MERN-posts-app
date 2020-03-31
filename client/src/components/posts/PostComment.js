import React from 'react';
import PropTypes from 'prop-types';

const PostComment = ({ text, name }) => {
  return (
    <div className="message is-primary">
      <div className="message-header">
        <p>{name}</p>
        <button className="delete" aria-label="delete"></button>
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
