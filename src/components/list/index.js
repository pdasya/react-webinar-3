import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';
import { cn as bem } from '@bem-react/classname';

function List({
  items,
  actionLabel = 'Добавить',
  onAction = () => {},
  showCount = false,
  className = 'List',
  itemClassName = 'Item',
  emptyMessage = 'Список пуст',
  showTotal = false,
  totalPrice = 0,
}) {
  const cn = bem(`${className}`);

  return (
    <div className={cn()}>
      {items.length ? (
        items.map(item => (
          <div key={item.code} className={cn('item')}>
            <Item
              item={item}
              actionLabel={actionLabel}
              onAction={onAction}
              showCount={showCount}
              className={itemClassName}
            />
          </div>
        ))
      ) : (
        <div className={cn('empty')}>{emptyMessage}</div>
      )}
      {showTotal && (
        <div className={cn('result')}>
          <span>Итого</span>
          <span>{totalPrice} ₽</span>
        </div>
      )}
    </div>
  );
}

List.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number.isRequired,
    }),
  ).isRequired,
  actionLabel: PropTypes.string,
  onAction: PropTypes.func,
  showCount: PropTypes.bool,
  className: PropTypes.string,
  itemClassName: PropTypes.string,
  emptyMessage: PropTypes.string,
  showTotal: PropTypes.bool,
  totalPrice: PropTypes.number,
};

export default React.memo(List);
