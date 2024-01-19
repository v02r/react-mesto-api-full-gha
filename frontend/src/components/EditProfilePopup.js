import React, {useContext, useEffect, useState} from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
    onUpdateUser({
      name,
      about: description,
    });
  };

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      title={"Редактировать профиль"}
      name={"edit"}
      onClose={onClose}
      isOpen={isOpen}
    >
      <label className="popup__input-field">
        <input
          value={name || ""}
          onChange={(e) => setName(e.target.value)}
          type="text"
          className="popup__input popup__input_type_name"
          placeholder="Имя"
          name="p-name"
          required
          minLength="2"
          maxLength="40"
        />
      </label>
      <span id="error-p-name" className="error-message"></span>

      <label className="popup__input-field">
        <input
          value={description  || ""}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          className="popup__input popup__input_type_job"
          placeholder="Должность"
          name="p-job"
          required
          minLength="2"
          maxLength="200"
        />
      </label>
      <span id="error-p-job" className="error-message"></span>
      <button className="popup__end-button" type="submit">
        Сохранить
      </button>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
