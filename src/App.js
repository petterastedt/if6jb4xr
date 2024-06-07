import React, { useState, useEffect } from 'react';
import CommentList from './components/CommentList';
import './App.css';

const App = () => {
  const [comments, setComments] = useState(() => {
    const savedComments = localStorage.getItem('comments');
    return savedComments ? JSON.parse(savedComments) : [];
  });

  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(comments));
  }, [comments]);

  const addComment = (text, parentId = null) => {
    const newComment = {
      id: Date.now(),
      text,
      parentId,
      children: []
    };

    if (parentId) {
      setComments((prevComments) =>
        updateNestedComments(prevComments, parentId, newComment)
      );

      return;
    }

    setComments((prevComments) => [...prevComments, newComment]);
  };

  const deleteComment = (id) => {
    setComments((prevComments) => removeNestedComment(prevComments, id));
  };

  const updateNestedComments = (comments, parentId, newComment) => {
    return comments.map((comment) => {
      if (comment.id === parentId) {
        return {
          ...comment,
          children: [...comment.children, newComment]
        };
      }

      if (comment.children.length > 0) {
        return {
          ...comment,
          children: updateNestedComments(comment.children, parentId, newComment)
        };
      }

      return comment;
    });
  };

  const removeNestedComment = (comments, id) => {
    return comments
      .map((comment) => {
        if (comment.id === id) {
          return null;
        }

        if (comment.children.length > 0) {
          return {
            ...comment,
            children: removeNestedComment(comment.children, id)
          };
        }

        return comment;
      })
      .filter((comment) => comment !== null);
  };

  return (
    <div className="App">
      <h1>Comments</h1>
      <CommentList
        comments={comments}
        addComment={addComment}
        deleteComment={deleteComment}
      />
    </div>
  );
};

export default App;
