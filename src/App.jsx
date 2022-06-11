import React, { useEffect, useState } from 'react';
import Card from './components/Card';
import Drawer from './components/Drawer';
import Header from './components/Header';

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cartOpened, setCartOpened] = useState(false);

  useEffect(() => {
    fetch('https://629e4f29c6ef9335c0b2ba29.mockapi.io/items')
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      setItems(json)
    });
  }, [items]);

  const checkExisting = function (list, obj) {
    return !list.every(function(elem) {
        return elem.id === obj.id;
    });
}

  const onAddToCart = (obj) => {
    if (checkExisting(cartItems, obj)) {
      setCartItems((prev) => [...prev, obj]);
      console.log(cartItems);
    }
  }

  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} />}      
      <Header
        onClickCart={() => setCartOpened(true)}
      />
      <div className="content p-40">
        <div className='d-flex align-center mb-40 justify-between'>
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input type="text" placeholder='Поиск...'/>
          </div>
        </div>
        <div className="d-flex flex-wrap">
          {items.map((item) => (
            <Card
              key={item.id}
              name={item.name}
              price={item.price}
              img={item.img}
              alt={item.alt}
              onFavorite={() => console.log('on click favorite')}
              onPlus={(obj) => onAddToCart(obj)}
            />
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default App;