import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import './style.css';
import useLocale from '../../locale/use-locale';

function BasketTotal({ sum, totalLabel }) {
  const cn = bem('BasketTotal');

  return (
    <div className={cn()}>
      <span className={cn('cell')}>{totalLabel}</span>
      <span className={cn('cell')}> {numberFormat(sum)} ₽</span>
      <span className={cn('cell')}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number,
  totalLabel: PropTypes.string.isRequired,
};

BasketTotal.defaultProps = {
  sum: 0,
};

export default memo(BasketTotal);
