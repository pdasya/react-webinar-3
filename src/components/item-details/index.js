import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import useLocale from '../../locale/use-locale';

function ItemDetails({ _id, description, vendor, category, year, price, onAdd, labels }) {
  const cn = bem('ItemDetails');
  const { translate } = useLocale();

  const callbacks = {
    onAdd: e => onAdd?.(_id),
  };

  return (
    <div className={cn()}>
      <div className={cn('description')}>{description}</div>
      <div className={cn('vendor')}>
        {labels.vendor}: <strong>{vendor}</strong>
      </div>
      <div className={cn('category')}>
        {labels.category}: <strong>{category}</strong>
      </div>
      <div className={cn('year')}>
        {labels.year}: <strong>{year}</strong>
      </div>
      <div className={cn('price')}>
        {labels.price}: <strong>{price} ₽</strong>
      </div>
      <div className={cn('action')}>
        <button onClick={callbacks.onAdd}>{labels.add}</button>
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
  labels: PropTypes.shape({
    vendor: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    add: PropTypes.string.isRequired,
  }).isRequired,
};

export default memo(ItemDetails);
