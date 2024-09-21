import React from 'react';
import PropTypes from 'prop-types';
import { getTypeOfNumber } from '../../utils';
import Button from '../button';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Item({ item, onAction, actionLabel = 'Добавить' }) {
  const cn = bem('Item');

  const handleAction = e => {
    e.stopPropagation();
    onAction(item.code);
  };

  return (
    <div className={cn()}>
      <div className={cn('code')}>{item.code}</div>
      <div className={cn('title')}>{item.title}</div>
      <div className={cn('price')}>{getTypeOfNumber(item.price)}&nbsp;₽</div>
      <Button action={actionLabel} onClick={handleAction} />
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  }).isRequired,
  actionLabel: PropTypes.string,
  onAction: PropTypes.func.isRequired,
};

export default React.memo(Item);
