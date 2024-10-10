import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import propTypes from 'prop-types';

function Notification(props) {
  const { showCancel, onCancel, t = text => text } = props;
  const cn = bem('Notification');
  const location = useLocation();

  return (
    <div className={cn()}>
      <Link className={cn('link')} to="/login" state={{ back: location.pathname }}>
        {t('notification.login')}
      </Link>
      <div>
        {t('notification.text')}{' '}
        {showCancel ? t('notification.response') : t('notification.comment')}
      </div>
      {showCancel && (
        <button className={cn('cancel')} onClick={onCancel}>
          {t('notification.cancel')}
        </button>
      )}
    </div>
  );
}

Notification.propTypes = {
  showCancel: propTypes.bool,
  onCancel: propTypes.func,
};

export default Notification;
