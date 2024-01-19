import React from "react";

const PopupWithForm = ({
  isOpen,
  onClose,
  title,
  name,
  children,
  onSubmit,
}) => {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          className="popup__cancel-button popup__cancel-button_type_add"
          type="button"
          title="Закрыть окно"
          onClick={onClose}
        />
        <h2 className="popup__title">{title}</h2>
        <form
          onSubmit={onSubmit}
          className="popup__form"
          id="formAddMesto"
          name={name}
        >
          {children}
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;
