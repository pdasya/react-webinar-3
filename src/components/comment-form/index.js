import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CommentForm(props) {
  const { title, onSubmit, onCancel, placeholder, t = text => text } = props;
  const [text, setText] = useState('');
  const cn = bem('CommentForm');

  const handleSubmit = () => {
    if (text.trim()) {
      onSubmit(text);
      setText('');
    }
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>{title}</div>
      <textarea
        className={cn('textarea')}
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder={placeholder}
      />
      <div className={cn('prop')}>
        <button className={cn('button')} onClick={handleSubmit}>
          {t('commentForm.submit')}
        </button>
        {onCancel && <button onClick={onCancel}>{t('commentForm.cancel')}</button>}
      </div>
    </div>
  );
}

CommentForm.propTypes = {
  title: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  placeholder: PropTypes.string,
  t: PropTypes.func,
};

export default CommentForm;
