import React, { useState } from 'react';

import PostComment from './PostComment';
import PostCommentForm from './PostCommentForm';

const PostItem = ({ text, name, date, comments, user, _id: id, authUser }) => {
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
          <PostComment key={comment._id} {...comment} />
        ))}

        <PostCommentForm postId={id} />
      </div>
    </div>
  );

  return (
    <div className="card" style={{ marginBottom: '30px' }}>
      <div className="card-content">
        {authUser && authUser._id === user ? (
          <button
            className="delete"
            aria-label="delete"
            style={{ position: 'absolute', right: '20px' }}
          ></button>
        ) : null}

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

export default PostItem;
