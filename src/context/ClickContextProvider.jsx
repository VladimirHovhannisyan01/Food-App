import { useState } from "react";
import ClickContext from "./ClickContext";

const ClickContextProvider = ({ children }) => {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };
  const hideCartHandler = () => {
    setCartIsShown(false);
  };
  return (
    <ClickContext.Provider
      value={{
        cartIsShown,
        showCartHandler,
        hideCartHandler,
      }}
    >
      {children}
    </ClickContext.Provider>
  );
};

export default ClickContextProvider;
