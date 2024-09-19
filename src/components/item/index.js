import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { plural } from '../../utils';
import './style.css';
import Button from '../button';

function Item(props) {
  // Счётчик выделений
  const [count, setCount] = useState(0);

  const handleAddToCart = () => {
    props.onAddToCart(props.item);
  };

  return (
    <div
      className={'Item'}
    >
      <div className="Item-code">{props.item.code}</div>
      <div className="Item-title">
        {props.item.title}
      </div>
      <div className="Item-price">
        {props.item.price}&nbsp;₽
      </div>
      <Button action={'Добавить'} onClick={handleAddToCart}></Button>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number,
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

Item.defaultProps = {
  onAddToCart: () => {},
};

export default React.memo(Item);
