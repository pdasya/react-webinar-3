import React from 'react';
import PropTypes from 'prop-types';
import { getTypeOfNumber } from '../../utils';
import './style.css';
import Button from '../button';

function Item({
  item,
  actionLabel = 'Добавить',
  onAction = () => {},
  showCount = false,
  className = 'Item',
  actionDataType = 'item',
}) {
  const handleAction = e => {
    e.stopPropagation();
    const data = actionDataType === 'code' ? item.code : item;
    onAction(data);
  };

  return (
    <div className={`${className}`}>
      <div className={`${className}-code`}>{item.code}</div>
      <div className={`${className}-title`}>{item.title}</div>
      <div className={`${className}-price`}>{getTypeOfNumber(item.price)}&nbsp;₽</div>
      {showCount && <div className={`${className}-count`}>{item.count} шт.</div>}
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
  actionDataType: PropTypes.oneOf(['item', 'code']),
};

export default React.memo(Item);
