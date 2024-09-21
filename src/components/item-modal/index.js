import React from 'react';
import PropTypes from 'prop-types';
import { getTypeOfNumber } from '../../utils';
import Button from '../button';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ItemModal({ item, onAction, actionLabel = 'Удалить', showCount = true }) {
  const cn = bem('ItemModal');

  const handleAction = e => {
    e.stopPropagation();
    onAction(item.code);
  };

  return (
    <div className={cn()}>
      <div className={cn('code')}>{item.code}</div>
      <div className={cn('title')}>{item.title}</div>
      <div className={cn('price')}>{getTypeOfNumber(item.price)}&nbsp;₽</div>
      {showCount && <div className={cn('count')}>{item.count} шт.</div>}{' '}
      <Button action={actionLabel} onClick={handleAction} />
    </div>
  );
}

ItemModal.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    count: PropTypes.number.isRequired,
  }).isRequired,
  onAction: PropTypes.func.isRequired,
  actionLabel: PropTypes.string,
  showCount: PropTypes.bool,
};

export default React.memo(ItemModal);
