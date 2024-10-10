import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import formatDate from '../../utils/date-format';

function CommentCard(props) {
  const { comment } = props;
  const cn = bem('CommentCard');

  return (
    <div className={cn()}>
      <div className={cn('header')}>
        <span className={cn('username')}>{comment.author?.profile.name || 'Anonymous'}</span>
        <span className={cn('date')}>{formatDate(comment.dateCreate)}</span>
      </div>
      <div className={cn('main')}>{comment.text || 'No content available'}</div>
      <button className={cn('link')}>Ответить</button>
    </div>
  );
}

CommentCard.propTypes = {
  comment: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    text: PropTypes.string.isRequired,
    dateCreate: PropTypes.string.isRequired,
    author: PropTypes.shape({
      _id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default memo(CommentCard);
