import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ItemDetails({ _id, description, vendor, category, year, price, onAdd }) {
  const cn = bem('ItemDetails');

  const callbacks = {
    onAdd: e => onAdd?.(_id),
  };

  return (
    <div className={cn()}>
      <div className={cn('description')}>{description}</div>
      <div className={cn('vendor')}>
        Страна производитель: <strong>{vendor}</strong>
      </div>
      <div className={cn('category')}>
        Категория: <strong>{category}</strong>
      </div>
      <div className={cn('year')}>
        Год выпуска: <strong>{year}</strong>
      </div>
      <div className={cn('price')}>
        Цена: <strong>{price} ₽</strong>
      </div>
      <div className={cn('action')}>
        <button onClick={callbacks.onAdd}>Добавить</button>
      </div>
    </div>
  );
}

ItemDetails.propTypes = {
  _id: PropTypes.string,
  description: PropTypes.string,
  vendor: PropTypes.string,
  category: PropTypes.string,
  year: PropTypes.number,
  price: PropTypes.number,
  onAdd: PropTypes.func,
};

export default memo(ItemDetails);
