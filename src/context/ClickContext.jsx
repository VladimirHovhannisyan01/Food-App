import { createContext } from "react";

const ClickContext = createContext({
  showCartHandler: () => {},
  hideCartHandler: () => {},
  cartIsShown: false,
});

export default ClickContext;
