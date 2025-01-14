import { useContext } from "react";
import classes from "./index.module.css";
import CartItem from "../CartItem";
import Modal from "../UI/Modal";
import CartContext from "../../context/CartContext";
import ClickContext from "../../context/ClickContext";

const Cart = () => {
  const cartCtx = useContext(CartContext);
  const { hideCartHandler, cartIsShown } = useContext(ClickContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    cartIsShown && (
      <Modal onClose={hideCartHandler}>
        {cartItems}
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>{totalAmount}</span>
        </div>
        <div className={classes.actions}>
          <button className={classes["button--alt"]} onClick={hideCartHandler}>
            Close
          </button>
          {hasItems && <button className={classes.button}>Order</button>}
        </div>
      </Modal>
    )
  );
};

export default Cart;
