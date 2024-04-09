import { useContext, useRef, useState } from "react";
import classes from "./index.module.css";
import CartContext from "../../context/CartContext";
import Input from "../UI/Input";

const MealItemForm = ({ price, id, name }) => {
  const { addItem } = useContext(CartContext);
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const amount = +enteredAmount;

    if (enteredAmount.trim().length === 0 || amount < 1 || amount > 5) {
      setAmountIsValid(false);
      return;
    }

    addItem({
      id,
      name,
      amount,
      price,
    });
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;
