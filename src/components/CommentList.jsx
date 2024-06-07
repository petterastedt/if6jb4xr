import React, { useState } from 'react';
import Comment from './Comment';

const CommentList = ({ comments, addComment, deleteComment }) => {
  const [text, setText] = useState('');
  const [inputError, setInputError] = useState('');

  const handleAddComment = () => {
    if (text) {
      addComment(text);
      setText('');
      return;
    }

    setInputError(true);
  };

  return (
    <div>
      <div className="input-wrapper">
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setInputError(false);
            setText(e.target.value);
          }}
          placeholder="Add a comment"
        />
        <button onClick={handleAddComment}>Add Comment</button>
      </div>
      {inputError && (
        <>
          <br />
          <span>The text field is empty!</span>
        </>
      )}

      <div>
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            addComment={addComment}
            deleteComment={deleteComment}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentList;
