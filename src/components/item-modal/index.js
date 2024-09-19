import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { getTypeOfNumber, plural } from '../../utils';
import './style.css';
import Button from '../button';

function ItemModal(props) {
  const callbacks = {
    onClick: e => {
      e.stopPropagation();
      props.onDelete(props.item.code);
    },
  };

  return (
    <div className={'ItemModal'}>
      <div className="ItemModal-code">{props.item.code}</div>
      <div className="ItemModal-title">{props.item.title} </div>

      <div className="ItemModal-price">{getTypeOfNumber(props.item.price)} ₽</div>
      <div className="ItemModal-count">{props.item.count} шт.</div>
      <Button action="Удалить" onClick={callbacks.onClick} />
    </div>
  );
}

ItemModal.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onClick: PropTypes.func,
};

export default React.memo(ItemModal);
