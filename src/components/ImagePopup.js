function ImagePopup() {
  return (
    <section className="popup popup_image" id="card-image">
      <div className="popup__image-container">
        <img
          className="popup__image"
          src="https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"
          alt=""
        />
        <h2 className="popup__image-title"></h2>
        <button type="button" className="popup__close"></button>
      </div>
    </section>
  );
}

export default ImagePopup;
