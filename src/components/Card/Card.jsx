import React, { useState } from 'react';
import { useContext } from 'react';
import ContentLoader from "react-content-loader"
import AppContext from '../../context';
import classes from './Card.module.scss';

function Card({
  id,
  name,
  alt,
  img,
  price,
  onFavorite,
  onPlus,
  favorited = false,
  loading = false
}) {
  const { isItemAdded } = useContext(AppContext);
  const [isFavorite, setIsFavorite] = useState(favorited);

  const onClickPlus = () => {
    onPlus({ id, name, price, img });
  }

  const onClickFavorite = () => {
    onFavorite({ id, name, price, img });
    setIsFavorite(!isFavorite);
  }

  return (
    <div className={classes.card}>
      { loading ? <ContentLoader 
          speed={2}
          width={150}
          height={250}
          viewBox="0 0 150 250"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="1" y="0" rx="10" ry="10" width="150" height="90" /> 
          <rect x="0" y="100" rx="0" ry="0" width="150" height="15" /> 
          <rect x="0" y="125" rx="0" ry="0" width="100" height="15" /> 
          <rect x="-2" y="180" rx="0" ry="0" width="80" height="25" /> 
          <rect x="114" y="180" rx="0" ry="0" width="30" height="30" />
        </ContentLoader>

        :
      <>
        <div
          className={classes.favorite}
          onClick={onFavorite}>
          <img src={isFavorite ? "/img/liked.svg" : "/img/unliked.svg"} alt={alt} onClick={onClickFavorite} />
        </div>
        <img width="100%" height={135} src={img} alt="Sneakers" />
        <h5>{name}</h5>
        <div className="d-flex justify-between align-center">
          <div className="d-flex flex-column">
            <span>Цена:</span>
            <b>{price} руб.</b>
          </div>
          <img
            className={classes.plus}
            src={isItemAdded(id) ? "/img/btn-checked.svg" : "/img/btn-plus.svg"}
            alt="Plus"
            onClick={onClickPlus} />
        </div>
      </>
      }
      
    </div>
  )
}

export default Card;