import { useState, useEffect } from "react";
import iconAdd from "../../src/images/icons/add.svg";
import api from "../utils/api";
import Card from "./Card";

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getProfileInfo(), api.getAllCards()])
      .then((res) => {
        const dataUser = res[0];
        const dataCards = res[1];
        setUserName(dataUser.name);
        setUserDescription(dataUser.about);
        setUserAvatar(dataUser.avatar);
        setCards(dataCards);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <main className="main">
      <section className="profile">
        <div className="row">
          <button
            type="button"
            className="profile__btn profile__btn_avatar"
            onClick={onEditAvatar}
            style={{ backgroundImage: `url(${userAvatar})` }}
          ></button>
          <div className="profile__info">
            <div className="flex-wrapper">
              <h1 className="profile__name">
                {userName}
              </h1>
              <button
                type="button"
                className="profile__btn profile__btn_edit"
                onClick={onEditProfile}
              ></button>
            </div>
            <p className="profile__detail">
              {userDescription === undefined || userDescription === null
                ? ""
                : userDescription}
            </p>
          </div>
        </div>
        <button
          type="button"
          className="profile__btn profile__btn_add"
          onClick={onAddPlace}
        >
          <img src={iconAdd} alt="добавить изображение" />
        </button>
      </section>
      <section className="cards">
        {cards.map((card) => (
          <Card card={card} key={card._id} onCardClick={onCardClick}/>
        ))}
      </section>
    </main>
  );
}

export default Main;
