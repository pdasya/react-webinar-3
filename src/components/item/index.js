import React from 'react';
import PropTypes from 'prop-types';
import { getTypeOfNumber } from '../../utils';
import './style.css';
import Button from '../button';

function Item({ item, onAddToCart = () => {} }) {
  const handleAddToCart = () => {
    onAddToCart(item);
  };

  return (
    <div className={'Item'}>
      <div className="Item-code">{item.code}</div>
      <div className="Item-title">{item.title}</div>
      <div className="Item-price">{getTypeOfNumber(item.price)}&nbsp;₽</div>
      <Button action="Добавить" onClick={handleAddToCart}></Button>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number.isRequired,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number,
    price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }).isRequired,
  onAddToCart: PropTypes.func,
};

export default React.memo(Item);
