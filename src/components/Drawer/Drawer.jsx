import axios from "axios";
import { useState } from "react";

import { useCart } from "../../hooks/useCart";
import Info from "../Info/Info";

import styles from './Drawer.module.scss';

const delay = () => new Promise((resolve) => setTimeout(resolve, 1000));

function Drawer({ onClose, onRemove, items = [], opened }) {
  const { cartItems, setCartItems, totalPrice } = useCart();
  const [orderId, setOrderId] = useState(null);
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post('https://629e4f29c6ef9335c0b2ba29.mockapi.io/orders', {
        items: cartItems,
      });
      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);

      for(let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete('https://629e4f29c6ef9335c0b2ba29.mockapi.io/cart/' + item.id);
        await delay();
      }

    } catch(err) {
      console.log('Ошибка при создании заказа');
    }
    setIsLoading(false);
  }

  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
      <div className={styles.drawer}>
        <h2 className="d-flex mb-30 justify-between">
          Корзина
          <img onClick={onClose} className="removeBtn cu-p" src="img/btn-remove.svg" alt="Remove" />
        </h2>

        {items.length ?
          <div className="d-flex flex-column flex">
            <div className="items flex">
            {
              items.map((obj) => (
                <div className="cartItem d-flex align-center mb-20" key={obj.id}>
                  <div
                    style={{ backgroundImage: `url(${obj.img})` }}
                    className="cartItemImg">
                  </div>
                  <div className="mr-20 flex">
                    <p className='mb-5'>{obj.name}</p>
                    <b>{obj.price} руб.</b>
                  </div>
                  <img onClick={() => onRemove(obj.id)} className="removeBtn" src="img/btn-remove.svg" alt="Remove" />
                </div>
              ))
            }
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{totalPrice} руб.</b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>{Math.round(totalPrice / 100 * 5)} руб.</b>
                </li>
                <button disabled={isLoading} className="greenButton" onClick={onClickOrder}>Оформить заказ <img src="img/arrow.svg" alt="Arrow" /></button>
              </ul>
            </div>
          </div>
          : 
          <Info
            title={ isOrderComplete ? "Заказ оформлен!" : 'Пустая корзина'}
            description={ isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан в доставку` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ" }
            img={ isOrderComplete ? "img/complete-order.jpg" : "img/empty-cart.jpg" }
          />
        }     
      </div>
    </div>
  );
}

export default Drawer;