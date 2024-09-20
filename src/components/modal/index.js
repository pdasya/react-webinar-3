import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import List from '../list';
import Button from '../button';
import Head from '../head';
import { getTypeOfNumber, getTotalPrice } from '../../utils';
import { cn as bem } from '@bem-react/classname';

function Modal({ cart, visible, setVisible, onDeleteItemCart = () => {} }) {
  const cn = bem('Modal');

  return (
    <div className={visible ? `Modal active` : cn()}>
      <div className={cn('content')} onClick={e => e.stopPropagation()}>
        <div className={cn()}>
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
          actionDataType="code"
        />
      </div>
    </div>
  );
}

Modal.propTypes = {
  cart: PropTypes.array.isRequired,
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  onDeleteItemCart: PropTypes.func,
};

export default React.memo(Modal);
