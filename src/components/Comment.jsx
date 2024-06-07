import React, { useState } from 'react';

const Comment = ({ comment, addComment, deleteComment }) => {
  const [replyText, setReplyText] = useState('');
  const [showReply, setShowReply] = useState(false);

  const handleAddReply = () => {
    if (replyText) {
      addComment(replyText, comment.id);
      setReplyText('');
      setShowReply(false);
    }
  };

  return (
    <div
      className="comment"
      style={{
        marginLeft: comment.parentId ? '20px' : '0'
      }}
    >
      <p>{comment.text}</p>
      <button onClick={() => setShowReply(!showReply)}>
        {showReply ? 'Cancel' : 'Reply'}
      </button>
      <button onClick={() => deleteComment(comment.id)}>Delete</button>
      {showReply && (
        <div>
          <input
            type="text"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Reply to this comment"
          />
          <button onClick={handleAddReply}>Add Reply</button>
        </div>
      )}
      <div>
        {comment.children.map((childComment) => (
          <Comment
            key={childComment.id}
            comment={childComment}
            addComment={addComment}
            deleteComment={deleteComment}
          />
        ))}
      </div>
    </div>
  );
};

export default Comment;
