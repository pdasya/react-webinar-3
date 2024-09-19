import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import ItemModal from "../item-modal";
import { getTypeOfNumber, getTotalPrice } from "../../utils";

function ListModal({ cart, onDeleteItem = () => {} }) {
  return (
    <div className="ListModal">
      {cart.length ? (
        cart.map((item) => (
          <div key={item.code} className="ListModal-item">
            <ItemModal item={item} onDelete={onDeleteItem} />
          </div>
        ))
      ) : (
        <div className="ListModal-empty">Товары еще не были добавлены в корзину</div>
      )}
      <div className="ListModal-result">
        <span>Итого</span>
        <span>{getTypeOfNumber(getTotalPrice(cart))} ₽</span>
      </div>
    </div>
  );
}

ListModal.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
  onDeleteItem: PropTypes.func,
};



export default React.memo(ListModal);
