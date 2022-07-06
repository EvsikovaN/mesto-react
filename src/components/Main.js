import iconAdd from "../../src/images/icons/add.svg";

function Main({onEditAvatar, onEditProfile, onAddPlace}) {
  
  return (
    <main className="main">
      <section className="profile">
        <div className="row">
          <button
            type="button"
            className="profile__btn profile__btn_avatar"
            onClick={onEditAvatar}
          ></button>
          <div className="profile__info">
            <div className="flex-wrapper">
              <h1 className="profile__name"></h1>
              <button
                type="button"
                className="profile__btn profile__btn_edit"
                onClick={onEditProfile}
              ></button>
            </div>
            <p className="profile__detail"></p>
          </div>
        </div>
        <button type="button" className="profile__btn profile__btn_add" onClick={onAddPlace}>
          <img src={iconAdd} alt="добавить изображение" />
        </button>
      </section>
      <section className="cards"></section>
    </main>
  );
}

export default Main;
