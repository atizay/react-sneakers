import classes from './Card.module.scss';

function Card(props) {
  return (
    <div className={classes.card}>
      <div className={classes.favorite}>
        <img src="/img/unliked.svg" alt={props.alt} />
      </div>
      <img width={133} height={112} src={props.img} alt="Sneakers" />
      <h5>{props.name}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <b>{props.price} руб.</b>
        </div>
        <button
          className="button"
          onClick={props.onClick}
        >
          <img width={11} height={11} src="/img/plus.svg" alt="Plus" />
        </button>
      </div>
    </div>
  )
}

export default Card;