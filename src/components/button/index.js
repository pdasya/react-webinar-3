import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Button({ action }) {
  return (
    <div className="Button-actions">
      <button>{action}</button>
    </div>
  );
}

Button.propTypes = {
  onAdd: PropTypes.string,
};

export default React.memo(Button);
