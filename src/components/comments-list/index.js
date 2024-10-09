import { memo } from 'react';
import PropTypes from 'prop-types';
import CommentCard from '../comment-card';
import './style.css';
import { cn as bem } from '@bem-react/classname';

function CommentList({ comments, commentsCount }) {
  const cn = bem('CommentList');

  return (
    <div className={cn()}>
      <h3 className={cn('header')}>Комментарии ({commentsCount})</h3>
      {comments.map(comment => (
        <CommentCard key={comment._id} comment={comment} />
      ))}
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
  commentsCount: PropTypes.number,
};

export default memo(CommentList);
