import React from 'react'
import { useContext } from 'react';
import AppContext from '../../context';

function Info({ img, title, description }) {
    const { setCartOpened } = useContext(AppContext);

    return (
        <div className="cartEmpty d-flex align-center justify-content-center flex-column flex">
            <img className="mb-20" width="120px" src={img} alt="Empty Cart" />
            <h2>{title}</h2>
            <p className="opacity-6">
                {description}
            </p>
            <button onClick={() => setCartOpened(false)} className="greenButton"><img src="img/arrow.svg" alt="Arrow" />Вернуться назад</button>
        </div>
    )
}

export default Info;