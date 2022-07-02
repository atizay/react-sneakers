import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import axios from 'axios';
import Drawer from './components/Drawer'
import Header from './components/Header'

import Home from './pages/Home'
import Wishlist from './pages/Wishlist'
import AppContext from './context';
import Orders from './pages/Orders';

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [cartOpened, setCartOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [itemsResponse, cartResponse, favoritesResponse] = await Promise.all([
          axios.get('https://629e4f29c6ef9335c0b2ba29.mockapi.io/items'),
          axios.get('https://629e4f29c6ef9335c0b2ba29.mockapi.io/cart'),
          axios.get('https://629e4f29c6ef9335c0b2ba29.mockapi.io/wishlist')
        ]);

        setIsLoading(false);
        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);
      } catch(error) {
        alert('Ошибка при запросе данных');
        console.log(error);
      }
    }

    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    console.log(obj)
    try {
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
      if (findItem) {
        setCartItems((prev) => prev.filter(elem => Number(elem.parentId) !== Number(obj.id)));
        await axios.delete(`https://629e4f29c6ef9335c0b2ba29.mockapi.io/cart/${findItem.id}`);
      } else {
        setCartItems((prev) => [...prev, data]);
        const { data } = await axios.post('https://629e4f29c6ef9335c0b2ba29.mockapi.io/cart', obj);
        setCartItems((prev) => prev.map(item => {
          if (item.parentId === data.parentId) {
            return {
              ...item,
              id: data.parentId
            };
          }
          return item;
        }));
      }
    } catch(err) {
      alert('Не удалось добавить товар в корзину');
      console.error(err);
    }
  };

  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://629e4f29c6ef9335c0b2ba29.mockapi.io/cart/${id}`);
      setCartItems((prev) => prev.filter(item => Number(item.id) !== Number(id)));
    } catch(error) {
      alert('Ошибка при удалении товара');
      console.error(error);
    }
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
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  }

  return (
    <AppContext.Provider value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        setCartItems,
        setCartOpened,
        onAddToCart
      }}>
      <div className="wrapper clear">
      <Drawer items={cartItems}
        onClose={() => setCartOpened(false)}
        onRemove={onRemoveItem}
        opened={cartOpened} 
      />
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
          <Route path="/orders" element={
            <Orders />
          }/>
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;