import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import ListModal from "../list-modal";
import Button from "../button";

function Modal({ cart, visible, setVisible, onDeleteItemCart = () => {} }) {
  return (
    <div className={visible ? `Modal active` : "Modal"}>
      <div className="Modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="Modal-head">
          <h1>Корзина</h1>
          <Button action='Закрыть' onClick={() => setVisible(false)}/>
        </div>
        <ListModal cart={cart} onDeleteItem={onDeleteItemCart} />
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
