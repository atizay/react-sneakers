import React from 'react';
import { Card } from './components/Card/Card';
import { Drawer } from './components/Drawer/Drawer';
import { Header } from './components/Header/Header';

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
          <Card price={1222}/>
          <Card price={1222}/>
          <Card price={1222}/>
          <Card price={1222}/>
        </div>
      </div>
    </div>
  );
}

export default App;