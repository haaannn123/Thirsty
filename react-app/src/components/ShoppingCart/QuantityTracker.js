import React, { useState, useEffect } from 'react';
import { thunkUpdateCartItemQuantityInDb } from '../../store/shopping_cart';
import { useDispatch } from 'react-redux';

function Counter({quantity, item}) {
    const [count, setCount] = useState(quantity);
    // const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch()

    const handleCountChange = async (event) => {
        const value = parseInt(event.target.value);
        setCount(value);
    };

    useEffect( async() => {
          await dispatch(thunkUpdateCartItemQuantityInDb(count, item))
    }, [dispatch, count]);


    const options = [];
    for (let i = 1; i <= 50; i++) {
        options.push(
            <option key={i} value={i}>
                {i}
            </option>
        );
    }

    return (
        <div>
            <span>QUANTITY </span>
            <select value={count} onChange={handleCountChange}>
                {options}
            </select>
        </div>
    );
}

export default Counter;
