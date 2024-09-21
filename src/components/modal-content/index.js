import React from 'react';
import PropTypes from 'prop-types';
import List from '../list';
import Button from '../button';
import Head from '../head';
import { getTypeOfNumber, getTotalPrice } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ModalContent({ cart, onDeleteItemCart, setVisible }) {
  const cn = bem('ModalContent');

  return (
    <div className={cn()}>
      <div className={cn('head')}>
        <Head title="Корзина" />
        <Button action="Закрыть" onClick={() => setVisible(false)} />
      </div>
      <List
        items={cart}
        actionLabel="Удалить"
        onAction={onDeleteItemCart}
        showCount={true}
        className="ListModal"
        itemClassName="ItemModal"
        emptyMessage="Товары еще не были добавлены в корзину"
        showTotal={true}
        getTotalPrice={items => getTypeOfNumber(getTotalPrice(items))}
      />
    </div>
  );
}

ModalContent.propTypes = {
  cart: PropTypes.array.isRequired,
  onDeleteItemCart: PropTypes.func.isRequired,
  setVisible: PropTypes.func.isRequired,
};

export default React.memo(ModalContent);
