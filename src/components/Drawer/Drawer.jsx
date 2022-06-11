function Drawer({ onClose, items = [] }) {
  return (
    <div className="overlay" onClick={onClose}>
      <div className="drawer">
        <h2 className="d-flex mb-30 justify-between">
          Корзина
          <img onClick={onClose} className="removeBtn cu-p" src="/img/btn-remove.svg" alt="Remove" />
        </h2>
        <div className="items">
          {
            items.map((obj) => (
              <div className="cartItem d-flex align-center mb-20">
                <div
                  style={{ backgroundImage: `url(${obj.img})` }}
                  className="cartItemImg">
                </div>
                <div className="mr-20 flex">
                  <p className='mb-5'>{obj.name}</p>
                  <b>{obj.price} руб.</b>
                </div>
                <img className="removeBtn" src="/img/btn-remove.svg" alt="Remove" />
              </div>
            ))
          }
        </div>
        <div className="cartTotalBlock">
          <ul>
            <li>
              <span>Итого:</span>
              <div></div>
              <b>22 498 руб.</b>
            </li>
            <li>
              <span>Налог 5%:</span>
              <div></div>
              <b>1074 руб.</b>
            </li>
            <button className="greenButton">Оформить заказ <img src="/img/arrow.svg" alt="Arrow" /></button>
          </ul>
        </div>        
      </div>
    </div>
  );
}

export default Drawer;