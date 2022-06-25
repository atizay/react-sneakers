import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom'
import Drawer from './components/Drawer'
import Header from './components/Header'
import Home from './pages/Home'
import Wishlist from './pages/Wishlist'

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [cartOpened, setCartOpened] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // fetch('https://629e4f29c6ef9335c0b2ba29.mockapi.io/items')
    // .then((response) => {
    //   return response.json();
    // })
    // .then((json) => {
    //   setItems(json)
    // });
    axios.get('https://629e4f29c6ef9335c0b2ba29.mockapi.io/items')
    .then(res => {
      setItems(res.data)
    });
    axios.get('https://629e4f29c6ef9335c0b2ba29.mockapi.io/cart')
    .then(res => {
      setCartItems(res.data)
    });
    axios.get('https://629e4f29c6ef9335c0b2ba29.mockapi.io/wishlist')
    .then(res => {
      setFavorites(res.data)
    });
  }, []);

  const onAddToCart = (obj) => {
    axios.post('https://629e4f29c6ef9335c0b2ba29.mockapi.io/cart', obj);
    setCartItems((prev) => [...prev, obj]);
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
      if (favorites.find((favObj) => favObj.id === obj.id)) {
        axios.delete(`https://629e4f29c6ef9335c0b2ba29.mockapi.io/wishlist/${obj.id}`);
        setFavorites((prev) => prev.filter(item => item.id !== obj.id));
      } else {
        const { data } = await  axios.post('https://629e4f29c6ef9335c0b2ba29.mockapi.io/wishlist', obj);
        setFavorites((prev) => [...prev, data]);
      }
    } catch(err) {
        alert('Не удалось добавить в Избранное');
    }
  }

  return (
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
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onChangeSearchInput={onChangeSearchInput}
            onAddToCart={onAddToCart}
            onAddToFavorite={onAddToFavorite}
        />} />
        <Route path="/wishlist" element={
          <Wishlist
            items={favorites}
            onAddToFavorite={onAddToFavorite}
          />
        }/>
      </Routes>
    </div>
  );
}

export default App;