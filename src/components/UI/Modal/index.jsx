import { Fragment } from "react";
import { createPortal } from "react-dom";
import classes from "./modal.module.css";

const Backdrop = ({ onClose }) => (
  <div className={classes.backdrop} onClick={onClose} />
);

const ModalOverlay = ({ children }) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = ({ onClose, children }) => {
  return (
    <Fragment>
      {createPortal(<Backdrop onClose={onClose} />, portalElement)}
      {createPortal(<ModalOverlay>{children}</ModalOverlay>, portalElement)}
    </Fragment>
  );
};

export default Modal;
