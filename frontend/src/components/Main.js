import React, { useContext, useEffect, useState } from "react";
import { api } from "../utils/Api";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Main = (props) => {
  const {
    onEditProfile,
    onAddPlace,
    onEditAvatar,
    onCardClick,
    onCardLike,
    cards,
    onCardDelete,
  } = props;
  const currentUser = useContext(CurrentUserContext);
  const userName = currentUser.name;
  const userDescription = currentUser.about;
  const userAvatar = currentUser.avatar;

  console.log(currentUser)

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__profile-info">
          <div className="profile__avatar-button" onClick={onEditAvatar}>
            <img
              src={userAvatar}
              alt="фото пофиля Жак-Ив Кусто"
              className="profile__avatar-image"
            />
            <button className="profile__avatar-edit" type="button"></button>
          </div>
          <div className="profile__name-block">
            <div className="profile__edit-info">
              <h1 className="profile__name">{userName}</h1>
              <button
                className="profile__edit-button"
                type="button"
                title="Редактировать профиль"
                onClick={onEditProfile}
              ></button>
            </div>
            <h2 className="profile__job">{userDescription}</h2>
          </div>
        </div>
        <button
          className="profile__add-button"
          type="button"
          title="Добавить профиль"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="elements">
        {cards.map((card) => (
          <Card
            key={card._id}
            onCardDelete={onCardDelete}
            onCardLike={onCardLike}
            card={card}
            onCardClick={onCardClick}
          />
        ))}
      </section>
    </main>
  );
};

export default Main;
