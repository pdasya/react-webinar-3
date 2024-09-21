import React from 'react';
import PropTypes from 'prop-types';
import { getTypeOfNumber } from '../../utils';
import './style.css';
import Button from '../button';
import { cn as bem } from '@bem-react/classname';

function Item({
  item,
  actionLabel = 'Добавить',
  onAction = () => {},
  showCount = false,
  className = 'Item',
}) {
  const handleAction = e => {
    e.stopPropagation();
    onAction(item.code);
  };

  const cn = bem(`${className}`);

  return (
    <div className={cn()}>
      <div className={cn('code')}>{item.code}</div>
      <div className={cn('title')}>{item.title}</div>
      <div className={cn('price')}>{getTypeOfNumber(item.price)}&nbsp;₽</div>
      {showCount && <div className={cn('count')}>{item.count} шт.</div>}
      <Button action={actionLabel} onClick={handleAction} />
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number.isRequired,
    title: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    count: PropTypes.number,
  }).isRequired,
  actionLabel: PropTypes.string,
  onAction: PropTypes.func,
  showCount: PropTypes.bool,
  className: PropTypes.string,
};

export default React.memo(Item);
