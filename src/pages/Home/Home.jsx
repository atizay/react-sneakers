import React from "react"
import Card from "../../components/Card"

function Home({
    items,
    searchValue,
    onChangeSearchInput,
    setSearchValue,
    onAddToCart,
    onAddToFavorite
    }) {
    return (
        <div className="content p-40">
            <div className='d-flex align-center mb-40 justify-between'>
                <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
                <div className="search-block d-flex">
                    <img src="/img/search.svg" alt="Search" />
                    {searchValue && 
                    <img
                        src="/img/btn-remove.svg"
                        className="clear cu-p"
                        alt="Search"
                        onClick={() => setSearchValue('')}/>
                    }
                    <input type="text" placeholder='Поиск...' value={searchValue} onChange={onChangeSearchInput}/>
                </div>
                </div>
                <div className="d-flex flex-wrap">
                {items
                .filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()))
                .map((item) => (
                    <Card
                    key={item.id}
                    onFavorite={(obj) => onAddToFavorite(obj)}
                    onPlus={(obj) => onAddToCart(obj)}
                    {...item}
                    />
                    ))
                }
            </div>
        </div> 
    )
}

export default Home;