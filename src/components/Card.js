function Card({card, onCardClick}) {
  return (
    <div className="card">
      <img className="card__photo" src={card.link} alt={card.name} onClick={_ => onCardClick(card)}/>
      <div className="card__caption">
        <h2 className="card__place">{card.name}</h2>
        <div className="like">
          <button className="card__btn card__btn_like" type="button"></button>
          <span className="like__counter">{card.likes.length}</span>
        </div>
      </div>
      <button className="trash" type="button"></button>
    </div>
  );
}

export default Card;
