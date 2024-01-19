import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Card = ({ card, onCardClick, onCardLike, onCardDelete }) => {
  const { likes, _id, name, link, owner, createdAt } = card;

  function handleClick() {
    onCardClick(card);
  }

  const currentUser = useContext(CurrentUserContext);

  const isOwn = owner === currentUser._id;
  const isLiked = likes.some((i) => i === currentUser._id);

  const cardLikeButtonClassName = `elements__like-button ${
    isLiked && "elements__like-button_active"
  }`;

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(_id);
  }

  return (
    <div className="elements__card">
      <img
        className="elements__image"
        src={link}
        alt={name}
        onClick={handleClick}
      />
      <div className="elements__mesto">
        <h2 className="elements__title">{name}</h2>
        <div className="elements__title_like-block">
          <button
            className={cardLikeButtonClassName}
            type="button"
            title="Нравится"
            onClick={handleLikeClick}
          />
          <span
            className="elements__like-number"
            aria-label="Количество лайков"
          >
            {likes.length}
          </span>
        </div>
        {isOwn && (
          <button
            onClick={handleDeleteClick}
            className="elements__delete-button elements__delete-button_visible"
            type="button"
            title="Удалить"
          />
        )}
      </div>
    </div>
  );
};

export default Card;
