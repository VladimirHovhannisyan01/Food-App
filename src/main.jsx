import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import CartContextProvider from "./context/CartContextProvider.jsx";
import ClickContextProvider from "./context/ClickContextProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClickContextProvider>
      <CartContextProvider>
        <App />
      </CartContextProvider>
    </ClickContextProvider>
  </React.StrictMode>
);
