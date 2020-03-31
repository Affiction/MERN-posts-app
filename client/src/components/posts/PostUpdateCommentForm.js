import React, { useState } from 'react';
import PropTypes from 'prop-types';

const PostUpdateCommentForm = ({ text, updateComment, submitForm }) => {
  const [comment, setComment] = useState(text);

  const handleSubmit = e => {
    e.preventDefault();

    updateComment({ text: comment });
    submitForm();
  };

  return (
    <form onSubmit={e => handleSubmit(e)} style={{ marginBottom: '30px' }}>
      {/* BEGIN text */}
      <div className="field">
        <div className="control">
          <textarea
            className="textarea is-large"
            placeholder="Say something..."
            value={comment}
            onChange={e => setComment(e.target.value)}
            required
            minLength="10"
          ></textarea>
        </div>
      </div>
      {/* END text */}

      {/*BEGIN submit */}
      <div className="field is-grouped is-grouped-right">
        <p className="control">
          <button type="submit" className="button is-success is-medium">
            Update comment
          </button>
        </p>
      </div>
      {/*END submit */}
    </form>
  );
};

PostUpdateCommentForm.propTypes = {
  text: PropTypes.string.isRequired,
  updateComment: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired
};

export default PostUpdateCommentForm;
