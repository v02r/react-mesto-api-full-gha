import React from "react";

const ImagePopup = ({ card, onClose }) => {
  return (
    <div
      className={"popup popup_type_image " + (card.name ? "popup_opened" : "")}
    >
      <div className="popup__image-container">
        <button
          className="popup__cancel-button popup__cancel-button_type_image"
          type="button"
          title="Закрыть окно"
          onClick={onClose}
        />
        <img className="popup__image" src={card.link} alt={card.name} />
        <h2 className="popup__title-bigimage">{card.name}</h2>
      </div>
    </div>
  );
};

export default ImagePopup;
