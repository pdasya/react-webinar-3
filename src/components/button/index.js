import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Button({ action, onClick }) {
  return (
    <div className="Button-actions">
      <button onClick={onClick} className="Button">
        {action}
      </button>
    </div>
  );
}

Button.propTypes = {
  action: PropTypes.string,
  onClick: PropTypes.func,
};

export default React.memo(Button);
