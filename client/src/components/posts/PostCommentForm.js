import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addCommentToPost } from '../../actions';

const PostCommentForm = ({ postId, addCommentToPost }) => {
  const [text, setText] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    addCommentToPost(postId, { text });
    setText('');
  };

  return (
    <form onSubmit={e => handleSubmit(e)} style={{ marginBottom: '30px' }}>
      {/* BEGIN text */}
      <div className="field">
        <div className="control">
          <textarea
            className="textarea is-large"
            placeholder="Say something..."
            value={text}
            onChange={e => setText(e.target.value)}
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
            Add comment
          </button>
        </p>
      </div>
      {/*END submit */}
    </form>
  );
};

PostCommentForm.propTypes = {
  addCommentToPost: PropTypes.func.isRequired
};

export default connect(null, { addCommentToPost })(PostCommentForm);
