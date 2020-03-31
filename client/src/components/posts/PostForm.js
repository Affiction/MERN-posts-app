import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addPost } from '../../actions';

const PostForm = ({ addPost }) => {
  const [text, setText] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    addPost({ text });
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
            Add Post
          </button>
        </p>
      </div>
      {/*END submit */}
    </form>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default connect(null, { addPost })(PostForm);
