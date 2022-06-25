import React, { useState } from 'react';
import classes from './Card.module.scss';

function Card({ id, name, alt, img, price, onFavorite, onPlus, favorited = false }) {
  const [isAdded, setIsAdded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(favorited);

  const onClickPlus = () => {
    onPlus({ name, price, img });
    setIsAdded(!isAdded);
  }

  const onClickFavorite = () => {
    onFavorite({ id, name, price, img });
    setIsFavorite(!isFavorite);
  }

  return (
    <div className={classes.card}>
      <div
        className={classes.favorite}
        onClick={onFavorite}
      >
        <img src={isFavorite ? "/img/liked.svg" : "/img/unliked.svg"} alt={alt} onClick={onClickFavorite} />
      </div>
      <img width={133} height={112} src={img} alt="Sneakers" />
      <h5>{name}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <b>{price} руб.</b>
        </div>
        <img
          className={classes.plus}
          src={isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg"}
          alt="Plus"
          onClick={onClickPlus} />
      </div>
    </div>
  )
}

export default Card;