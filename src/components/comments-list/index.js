import { memo } from 'react';
import PropTypes from 'prop-types';
import CommentCard from '../comment-card';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import Notification from '../notification';
import CommentForm from '../comment-form';

function CommentList({ comments, isLoggedIn, onCommentSubmit }) {
  const cn = bem('CommentList');

  function renderComments(comments, level = 0) {
    return comments.map(comment => (
      <div key={comment._id} style={{ marginLeft: level > 0 ? '30px' : '0' }}>
        <CommentCard comment={comment} />
        {comment.children && comment.children.length > 0 && (
          <div>{renderComments(comment.children, level + 1)}</div>
        )}
      </div>
    ));
  }

  return (
    <div className={cn()}>
      <h3 className={cn('header')}>Комментарии ({comments.length})</h3>
      {renderComments(comments)}
      {!isLoggedIn ? (
        <Notification showCancel={isLoggedIn} />
      ) : (
        <CommentForm title={'Новый комментарий'} onSubmit={onCommentSubmit} placeholder={'Текст'} />
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
};

export default memo(CommentList);
