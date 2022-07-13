import { useState, useEffect } from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import api from "../utils/api.js";

function App() {
  //переменные состояния, отвечающие за видимость трёх попапов
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    api
      .getProfileInfo()
      .then((res) => {
        setCurrentUser(res)
      })
      .catch((err) => console.error(err));
  }, []);

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

  const handleUpdateUser = (data) => {
    api
      .setProfileInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateAvatar = (data) => {
    api
      .setProfileAvatar(data.avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="page__content">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />

        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
        />

        <Footer />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/> 

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

      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
