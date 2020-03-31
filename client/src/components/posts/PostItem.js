import React, { useState } from 'react';

import PostComment from './PostComment';

const PostItem = ({ text, name, date, comments, user, _id: id }) => {
  const [visible, toggle] = useState(false);

  const toggleMessages = e => {
    e.preventDefault();

    toggle(!visible);
  };

  const cardFooter =
    comments.length > 0 ? (
      <footer className="card-footer">
        <a
          href="#"
          className="card-footer-item"
          onClick={e => toggleMessages(e)}
        >
          Show Messages {comments.length !== 0 && `(${comments.length})`}
        </a>
      </footer>
    ) : null;

  const commentsList = visible && (
    <div className="container">
      <div className="notification">
        {comments.map(comment => (
          <PostComment key={comment._id} {...comment} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="card">
      <div className="card-content">
        {id === user ? (
          <button className="delete" aria-label="delete"></button>
        ) : null}
        <button
          className="delete"
          aria-label="delete"
          style={{ position: 'absolute', right: '20px' }}
        ></button>

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
