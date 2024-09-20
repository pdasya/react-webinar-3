import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { getTotalPrice, getTypeOfNumber, plural } from '../../utils';
import Button from '../button';
import { cn as bem } from '@bem-react/classname';

function Cart({ cart = [], setVisible = () => {} }) {
  const cn = bem('Cart');

  return (
    <div className={cn()}>
      <div className={cn('description')}>
        <span>В корзине: </span>
        {cart.length !== 0 ? (
          <span>
            {cart.length}{' '}
            {`${plural(cart.length, {
              one: 'товар',
              few: 'товарa',
              many: 'товаров',
            })}`}{' '}
            / {getTypeOfNumber(getTotalPrice(cart))} ₽
          </span>
        ) : (
          <span>пусто</span>
        )}
      </div>
      <Button action="Перейти" onClick={() => setVisible(true)}></Button>
    </div>
  );
}

Cart.propTypes = {
  cart: PropTypes.array,
  setVisible: PropTypes.func,
};

export default React.memo(Cart);
