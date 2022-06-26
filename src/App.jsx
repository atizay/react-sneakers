import React, { useEffect, useState, useContext, createContext } from 'react';
import { Routes, Route } from 'react-router-dom'
import axios from 'axios';
import Drawer from './components/Drawer'
import Header from './components/Header'

import Home from './pages/Home'
import Wishlist from './pages/Wishlist'
import AppContext from './context';

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [cartOpened, setCartOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const itemsResponse = await axios.get('https://629e4f29c6ef9335c0b2ba29.mockapi.io/items');
      const cartResponse = await axios.get('https://629e4f29c6ef9335c0b2ba29.mockapi.io/cart');
      const favoritesResponse = await axios.get('https://629e4f29c6ef9335c0b2ba29.mockapi.io/wishlist');

      setIsLoading(false);
      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data);
      setItems(itemsResponse.data);
    }

    fetchData();
  }, []);

  const onAddToCart = (obj) => {
    console.log(obj)
    try {
      if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
        axios.delete(`https://629e4f29c6ef9335c0b2ba29.mockapi.io/cart/${obj.id}`);
        setCartItems((prev) => prev.filter(elem => Number(elem.id) !== Number(obj.id)));
      } else {
        axios.post('https://629e4f29c6ef9335c0b2ba29.mockapi.io/cart', obj);
        setCartItems((prev) => [...prev, obj]);
      }
    } catch(err) {
      alert('Не удалось добавить товар в корзину')
    }
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://629e4f29c6ef9335c0b2ba29.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter(item => item.id !== id));
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  }

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://629e4f29c6ef9335c0b2ba29.mockapi.io/wishlist/${obj.id}`);
        setFavorites((prev) => prev.filter(item => item.id !== obj.id));
      } else {
        const { data } = await  axios.post('https://629e4f29c6ef9335c0b2ba29.mockapi.io/wishlist', obj);
        setFavorites((prev) => [...prev, data]);
      }
    } catch(err) {
        console.log('Не удалось добавить в Избранное');
    }
  }

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id));
  }

  return (
    <AppContext.Provider value={{ items, cartItems, favorites, isItemAdded, setCartItems, setCartOpened }}>
      <div className="wrapper clear">
        {cartOpened && <Drawer items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}  
        />}      
        <Header onClickCart={() => setCartOpened(true)} />

        <Routes>
          <Route index element={
            <Home
              items={items}
              cartItems={cartItems}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart}
              isLoading={isLoading}
          />} />
          <Route path="/wishlist" element={
            <Wishlist
              onAddToFavorite={onAddToFavorite}
            />
          }/>
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;