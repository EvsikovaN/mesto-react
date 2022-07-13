import { useState, useEffect, useContext } from "react";
import iconAdd from "../../src/images/icons/add.svg";
import api from "../utils/api";
import Card from "./Card";
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {
  
  const [cards, setCards] = useState([]);
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    Promise.all([api.getAllCards()])
      .then((res) => {
        const dataCards = res[0];
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
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
          ></button>
          <div className="profile__info">
            <div className="flex-wrapper">
              <h1 className="profile__name">
                {currentUser.name}
              </h1>
              <button
                type="button"
                className="profile__btn profile__btn_edit"
                onClick={onEditProfile}
              ></button>
            </div>
            <p className="profile__detail">
              {currentUser.about === undefined || currentUser.about === null
                ? ""
                : currentUser.about}
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
