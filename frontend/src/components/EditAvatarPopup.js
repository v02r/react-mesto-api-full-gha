import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar }) => {
  const inputRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      title={"Обновить аватар"}
      name={"profile-photo-change"}
      onClose={onClose}
      isOpen={isOpen}
    >
      <input
        type="url"
        name="avatar"
        placeholder="Ссылка на картинку"
        className="popup__input popup__input_type_link"
        required
        ref={inputRef}
      />

      <p data-target="avatar" id="error-avatar" className="error-message"></p>

      <button id="" className="popup__end-button" type="submit">
        Сохранить
      </button>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
