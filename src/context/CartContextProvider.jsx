import { useCallback, useReducer } from "react";
import CartContext from "./CartContext";

const defoultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "ADD":
      const updatedTotalAmount =
        state.totalAmount + payload.price * payload.amount;

      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === payload.id
      );

      const existingCartItem = state.items[existingCartItemIndex];

      let updatedItems;

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + payload.amount,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(payload);
      }

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };

    case "REMOVE":
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === payload
      );
      const existingItem = state.items[existingItemIndex];
      const totalAmount = state.totalAmount - existingItem.price;
      let newItems;
      if (existingItem.amount === 1) {
        newItems = state.items.filter((item) => item.id !== payload);
      } else {
        const updatedItem = {
          ...existingItem,
          amount: existingItem.amount - 1,
        };
        newItems = [...state.items];
        newItems[existingItemIndex] = updatedItem;
      }
      return {
        items: newItems,
        totalAmount: totalAmount,
      };

    default:
      return defoultCartState;
  }
};

const CartContextProvider = ({ children }) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defoultCartState
  );

  const addItemToCartHandler = useCallback((item) => {
    dispatchCartAction({ type: "ADD", payload: item });
  }, []);

  const removeItemFromCartHandler = useCallback((id) => {
    dispatchCartAction({ type: "REMOVE", payload: id });
  }, []);

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
};

export default CartContextProvider;
