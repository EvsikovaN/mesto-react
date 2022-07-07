import { useState } from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import api from "../utils/api.js";

function App() {
  //переменные состояния, отвечающие за видимость трёх попапов
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null)

  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  };

  const closeAllPopups = () => {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard(null)
  }

  return (
    <div className="page__content">
      <Header />

      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
      />

      <Footer />
      
      <PopupWithForm name="edit-profile" title="Редактировать профиль" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} >
        <section className="popup__form-section">
          <input
            className="popup__input popup__input_type_name"
            type="text"
            name="name"
            minLength="2"
            maxLength="40"
            required
          />
          <span className="popup__form-error-message"></span>
        </section>
        <section className="popup__form-section">
          <input
            className="popup__input popup__input_type_detail"
            type="text"
            name="about"
            minLength="2"
            maxLength="200"
            required
          />
          <span className="popup__form-error-message"></span>
        </section>
      </PopupWithForm>

      <PopupWithForm name="edit-avatar" title="Обновить аватар" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} >
        <section className="popup__form-section">
          <input
            className="popup__input popup__input_type_link"
            type="text"
            name="link"
            minLength="2"
            required
            placeholder="Введите ссылку на изображение"
          />
          <span className="popup__form-error-message"></span>
        </section>
      </PopupWithForm>

      <PopupWithForm name="add-card" title="Новое место" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} >
        <section className="popup__form-section">
          <input
            className="popup__input popup__input_type_title"
            type="text"
            placeholder="Название"
            value=""
            name="name"
            required
            minLength="2"
            maxLength="30"
          />
          <span className="popup__form-error-message"></span>
        </section>
        <section className="popup__form-section">
          <input
            className="popup__input popup__input_type_link"
            type="text"
            placeholder="Сылка на картинку"
            value=""
            name="link"
            required
            pattern="(http|https):\/\/([\w.]+\/?)\S*"
          />
          <span className="popup__form-error-message"></span>
        </section>
      </PopupWithForm>

      <PopupWithForm name="delete-card" title="Вы уверены?" submit="Да" onClose={closeAllPopups} />
      
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </div>
  );
}

export default App;
