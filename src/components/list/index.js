import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';

function List({
  items,
  actionLabel = 'Добавить',
  onAction = () => {},
  showCount = false,
  className = 'List',
  itemClassName = 'Item',
  emptyMessage = 'Список пуст',
  showTotal = false,
  getTotalPrice = () => 0,
  actionDataType = 'item',
}) {
  return (
    <div className={`${className}`}>
      {items.length ? (
        items.map(item => (
          <div key={item.code} className={`${className}-item`}>
            <Item
              item={item}
              actionLabel={actionLabel}
              onAction={onAction}
              showCount={showCount}
              className={itemClassName}
              actionDataType={actionDataType}
            />
          </div>
        ))
      ) : (
        <div className={`${className}-empty`}>{emptyMessage}</div>
      )}
      {showTotal && (
        <div className={`${className}-result`}>
          <span>Итого</span>
          <span>{getTotalPrice(items)} ₽</span>
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
  getTotalPrice: PropTypes.func,
  actionDataType: PropTypes.oneOf(['item', 'code']),
};

export default React.memo(List);
