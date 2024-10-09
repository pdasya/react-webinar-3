export default function buildCommentTree(comments) {
  const commentMap = {};
  comments.forEach(comment => {
    comment.children = [];
    commentMap[comment._id] = comment;
  });

  const commentTree = [];

  comments.forEach(comment => {
    if (comment.parent && comment.parent._type === 'comment') {
      const parentComment = commentMap[comment.parent._id];
      if (parentComment) {
        parentComment.children.push(comment);
      }
    } else {
      commentTree.push(comment);
    }
  });

  return commentTree;
}
