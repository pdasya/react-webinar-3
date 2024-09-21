import React from 'react';
import PropTypes from 'prop-types';
import List from '../list';
import Head from '../head';
import Button from '../button';
import ItemModal from '../item-modal';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ModalContent({ cart, onDeleteItemCart, setVisible, totalPrice }) {
  const cn = bem('ModalContent');

  return (
    <div className={cn()}>
      <div className={cn('head')}>
        <Head title="Корзина" />
        <Button action="Закрыть" onClick={() => setVisible(false)} />
      </div>
      <List
        items={cart}
        ItemComponent={ItemModal}
        onAction={onDeleteItemCart}
        actionLabel="Удалить"
        className="ListModal"
        showTotal={true}
        totalPrice={totalPrice}
        showCount={true}
      />
    </div>
  );
}

ModalContent.propTypes = {
  cart: PropTypes.array.isRequired,
  onDeleteItemCart: PropTypes.func.isRequired,
  setVisible: PropTypes.func.isRequired,
  totalPrice: PropTypes.number,
};

export default React.memo(ModalContent);
