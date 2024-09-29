import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import './style.css';

function BasketTool({ sum, amount, onOpen, labels }) {
  const cn = bem('BasketTool');

  return (
    <div className={cn()}>
      <span className={cn('label')}>{labels.inCart}</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, labels.products)} / ${numberFormat(sum)} ₽`
          : labels.empty}
      </span>
      <button onClick={onOpen} className={cn('button')}>
        {labels.go}
      </button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  labels: PropTypes.shape({
    inCart: PropTypes.string.isRequired,
    products: PropTypes.shape({
      one: PropTypes.string.isRequired,
      few: PropTypes.string.isRequired,
      many: PropTypes.string.isRequired,
    }).isRequired,
    empty: PropTypes.string.isRequired,
    go: PropTypes.string.isRequired,
  }).isRequired,
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
};

export default memo(BasketTool);
