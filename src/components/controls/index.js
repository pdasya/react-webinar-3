import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import Button from '../button';

function Controls({ onAdd }) {
  return (
    <div className="Controls">
      <Button action={'Показать'}></Button>
    </div>
  );
}

// Controls.propTypes = {
//   onAdd: PropTypes.func,
// };

// Controls.defaultProps = {
//   onAdd: () => {},
// };

export default React.memo(Controls);
