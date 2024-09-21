import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import Button from '../button';
import { cn as bem } from '@bem-react/classname';
import { plural } from '../../utils';

function Cart({ totalItems = 0, totalPrice = 0, setVisible = () => {} }) {
  const cn = bem('Cart');

  return (
    <div className={cn()}>
      <div className={cn('description')}>
        <span>В корзине: </span>
        {totalItems !== 0 ? (
          <span>
            {totalItems}{' '}
            {`${plural(totalItems, {
              one: 'товар',
              few: 'товара',
              many: 'товаров',
            })}`}{' '}
            / {totalPrice} ₽
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
  totalItems: PropTypes.number,
  totalPrice: PropTypes.number,
  setVisible: PropTypes.func,
};

export default React.memo(Cart);
