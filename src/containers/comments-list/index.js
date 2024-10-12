import { memo, useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import CommentCard from '../../components/comment-card';
import { cn as bem } from '@bem-react/classname';
import Notification from '../../components/notification';
import CommentForm from '../../components/comment-form';
import CommentHeader from '../../components/comments-header';
import useTranslate from '../../hooks/use-translate';
import treeToList from '../../utils/tree-to-list';
import listToTree from '../../utils/list-to-tree';

function CommentList({ comments, isLoggedIn, onCommentSubmit, onResponseSubmit, currentUserName }) {
  const cn = bem('CommentList');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyingToAuthor, setReplyingToAuthor] = useState('');

  const { t } = useTranslate();

  const handleReplyClick = useCallback((commentId, authorName) => {
    setReplyingTo(commentId);
    setReplyingToAuthor(authorName);
  }, []);

  const handleReplySubmit = useCallback(
    (text, commentId) => {
      onResponseSubmit(text, commentId);
      setReplyingTo(null);
      setReplyingToAuthor('');
    },
    [onResponseSubmit],
  );

  const handleCancelReply = useCallback(() => {
    setReplyingTo(null);
    setReplyingToAuthor('');
  }, []);

  const renderReplyForm = useCallback(
    commentId =>
      isLoggedIn ? (
        <CommentForm
          title={t('commentList.newResponse')}
          onSubmit={text => handleReplySubmit(text, commentId)}
          placeholder={`${t('commentList.responsePlaceholder')} ${replyingToAuthor}`}
          onCancel={handleCancelReply}
          t={t}
        />
      ) : (
        <Notification showCancel={true} onCancel={handleCancelReply} t={t} />
      ),
    [isLoggedIn, t, handleReplySubmit, replyingToAuthor, handleCancelReply],
  );

  const hierarchicalComments = useMemo(() => {
    const tree = listToTree(comments);
    return treeToList(tree, (item, level) => ({ ...item, level }));
  }, [comments]);

  const renderComment = useCallback(
    comment => (
      <div
        key={comment._id}
        style={{
          marginLeft: comment.level > 0 && comment.level < 10 ? `${comment.level * 30}px` : '0',
        }}
      >
        <CommentCard
          comment={comment}
          onClick={() =>
            handleReplyClick(comment._id, comment.author?.profile?.name || t('commentList.name'))
          }
          t={t}
          isLoggedIn={isLoggedIn}
          currentUserName={currentUserName}
        />
        {replyingTo === comment._id && renderReplyForm(comment._id)}
      </div>
    ),
    [handleReplyClick, replyingTo, renderReplyForm, isLoggedIn, currentUserName, t],
  );

  return (
    <div className={cn()}>
      <CommentHeader count={comments.length} t={t} />
      {hierarchicalComments.map(renderComment)}
      {!isLoggedIn && !replyingTo && <Notification showCancel={isLoggedIn} t={t} />}
      {isLoggedIn && (
        <CommentForm
          title={t('commentList.newComment')}
          onSubmit={onCommentSubmit}
          placeholder={t('commentList.commentPlaceholder')}
          t={t}
        />
      )}
    </div>
  );
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      text: PropTypes.string.isRequired,
      dateCreate: PropTypes.string.isRequired,
      author: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        profile: PropTypes.shape({
          name: PropTypes.string.isRequired,
        }),
      }),
      parent: PropTypes.shape({
        _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      }),
    }),
  ).isRequired,
  isLoggedIn: PropTypes.bool,
  onCommentSubmit: PropTypes.func.isRequired,
  onResponseSubmit: PropTypes.func.isRequired,
  currentUserName: PropTypes.string,
};

export default memo(CommentList);
