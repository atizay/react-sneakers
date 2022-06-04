import React from 'react';
import Card from './components/Card';
import Drawer from './components/Drawer';
import Header from './components/Header';

const arr = [
  {
    id: 1,
    name: 'Мужские Кроссовки Nuke Blazer Mid Suede',
    alt: 'Мужские Кроссовки Nuke Blazer Mid Suede',
    price: 12994,
    img: '/img/sneakers/1.jpg'
  },
  {
    id: 2,
    name: 'Мужские Кроссовки Nike Air Max 270',
    alt: 'Мужские Кроссовки Nike Air Max 270',
    price: 14994,
    img: '/img/sneakers/2.jpg'
  },
  {
    id: 3,
    name: 'Мужские Кроссовки Nike Blazer Mid Suede',
    alt: 'Мужские Кроссовки Nike Blazer Mid Suede',
    price: 15994,
    img: '/img/sneakers/3.jpg'
  },
  {
    id: 4,
    name: 'Кроссовки Puma X Aka Boku Future Rider',
    alt: 'Кроссовки Puma X Aka Boku Future Rider',
    price: 10994,
    img: '/img/sneakers/4.jpg'
  },
];

function App() {

  return (
    <div className="wrapper clear">
      <Drawer />
      <Header />
      <div className="content p-40">
        <div className='d-flex align-center mb-40 justify-between'>
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input type="text" placeholder='Поиск...'/>
          </div>
        </div>
        <div className="d-flex">
          {arr.map((product) => (
            <Card
              key={product.id}
              name={product.name}
              price={product.price}
              img={product.img}
              alt={product.alt}
              onClick={() => console.log(product)}
            />
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default App;