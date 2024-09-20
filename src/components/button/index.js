import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';

function Button({ action, onClick }) {
  const cn = bem('Button');

  return (
    <div className={cn()}>
      <button onClick={onClick} className={cn('actions')}>
        {action}
      </button>
    </div>
  );
}

Button.propTypes = {
  action: PropTypes.string,
  onClick: PropTypes.func,
};

export default React.memo(Button);
