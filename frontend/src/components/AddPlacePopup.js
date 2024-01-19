import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = ({ isOpen, onClose, onAddPlace }) => {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);
  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name,
      link,
    });
  }
  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      title={"Новое место"}
      name={"add-mesto"}
      onClose={onClose}
      isOpen={isOpen}
    >
      <label className="popup__input-field">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          className="popup__input popup__input_type_mesto"
          placeholder="Название"
          name="place-name"
          required
          minLength="2"
          maxLength="30"
        />
      </label>
      <span id="error-place-name" className="error-message"></span>

      <label className="popup__input-field">
        <input
          value={link}
          onChange={(e) => setLink(e.target.value)}
          type="url"
          className="popup__input popup__input_type_link"
          placeholder="Ссылка на картинку"
          name="img-link"
          required
        />
      </label>
      <span id="error-img-link" className="error-message"></span>
      <button className="popup__end-button" type="submit">
        Создать
      </button>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
