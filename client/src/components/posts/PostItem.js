import React from 'react';

const PostItem = ({ text, name, date }) => {
  return (
    <div className="card">
      <div className="card-content">
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
    </div>
  );
};

export default PostItem;
