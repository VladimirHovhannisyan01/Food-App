import { useContext, useEffect, useState } from "react";
import classes from "./index.module.css";
import CartContext from "../../../context/CartContext";
import CartIcon from "../../CartIcon";
import ClickContext from "../../../context/ClickContext";

const HeaderCartButton = () => {
  const [btnIsHighLighted, setBtnIsHighLighted] = useState(false);
  const cartCtx = useContext(CartContext);
  const { showCartHandler } = useContext(ClickContext);

  const { items } = cartCtx;

  const numberOfCartItems = items.reduce(
    (curNumber, item) => curNumber + item.amount,
    0
  );

  const btnClasses = `${classes.button} ${
    btnIsHighLighted ? classes.bump : ""
  }`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighLighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighLighted(false);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={showCartHandler}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
