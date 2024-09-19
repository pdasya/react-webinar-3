import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function Modal({ cart, visible, setVisible}) {
  return (
    <div className={visible ? `Modal active` : "Modal"}>
      <div className="Modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="Modal-head">
          <h1>Корзина</h1>
          <button onClick={() => setVisible(false)}>Закрыть</button>
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  cart: PropTypes.array.isRequired,
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
};


export default React.memo(Modal);
