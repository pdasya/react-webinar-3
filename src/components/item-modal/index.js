import React from 'react';
import PropTypes from 'prop-types';
import { getTypeOfNumber } from '../../utils';
import './style.css';
import Button from '../button';

function ItemModal({ item, onDelete = () => {} }) {
  const handleClick = e => {
    e.stopPropagation();
    onDelete(item.code);
  };

  return (
    <div className={'ItemModal'}>
      <div className="ItemModal-code">{item.code}</div>
      <div className="ItemModal-title">{item.title}</div>
      <div className="ItemModal-price">{getTypeOfNumber(item.price)} ₽</div>
      <div className="ItemModal-count">{item.count} шт.</div>
      <Button action="Удалить" onClick={handleClick} />
    </div>
  );
}

ItemModal.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number.isRequired,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number,
  }).isRequired,
  onDelete: PropTypes.func,
};

export default React.memo(ItemModal);
