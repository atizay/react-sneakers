import React, { useState } from 'react';
import classes from './Card.module.scss';

function Card({ name, alt, img, price, onFavorite, onPlus }) {
  const [isAdded, setIsAdded] = useState(false);

  const onClickPlus = () => {
    onPlus({ name, price, img });
    setIsAdded(!isAdded);
  }

  return (
    <div className={classes.card}>
      <div
        className={classes.favorite}
        onClick={onFavorite}
      >
        <img src="/img/unliked.svg" alt={alt} />
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