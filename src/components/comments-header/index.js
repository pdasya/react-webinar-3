import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CommentHeader({ count, t = text => text }) {
  const cn = bem('CommentHeader');
  return (
    <h3 className={cn()}>
      {t('commentHeader.comments')} ({count})
    </h3>
  );
}

CommentHeader.propTypes = {
  count: PropTypes.number.isRequired,
  t: PropTypes.func,
};

export default CommentHeader;
