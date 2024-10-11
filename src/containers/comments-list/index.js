import { memo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import CommentCard from '../../components/comment-card';
import { cn as bem } from '@bem-react/classname';
import Notification from '../../components/notification';
import CommentForm from '../../components/comment-form';
import CommentHeader from '../../components/comments-header';
import useTranslate from '../../hooks/use-translate';

function CommentList({ comments, isLoggedIn, onCommentSubmit, onResponseSubmit }) {
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

  const renderReplyForm = commentId =>
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
    );

  const renderComments = useCallback(
    (comments, level = 0) =>
      comments.map(comment => (
        <div key={comment._id} style={{ marginLeft: level > 0 ? '30px' : '0' }}>
          <CommentCard
            comment={comment}
            onClick={() =>
              handleReplyClick(comment._id, comment.author?.profile?.name || t('commentList.name'))
            }
            t={t}
          />
          {replyingTo === comment._id && renderReplyForm(comment._id)}
          {comment.children &&
            comment.children.length > 0 &&
            renderComments(comment.children, level + 1)}
        </div>
      )),
    [handleReplyClick, replyingTo, renderReplyForm],
  );

  return (
    <div className={cn()}>
      <CommentHeader count={comments.length} t={t} />
      {renderComments(comments)}
      {!isLoggedIn && !replyingTo && <Notification showCancel={isLoggedIn} t={t} />}
      {isLoggedIn && !replyingTo && (
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
    }),
  ).isRequired,
  isLoggedIn: PropTypes.bool,
  onCommentSubmit: PropTypes.func.isRequired,
  onResponseSubmit: PropTypes.func.isRequired,
};

export default memo(CommentList);
