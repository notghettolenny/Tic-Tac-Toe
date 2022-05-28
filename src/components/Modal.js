import "./Modal.css";

const Modal = ({ modalClasses, children }) => {
  return <div className={modalClasses}>{children}</div>;
};

export default Modal;
