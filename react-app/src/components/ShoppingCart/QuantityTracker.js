import React, { useState, useEffect } from 'react';
import { thunkUpdateCartItemQuantityInDb, getCartThunk } from '../../store/shopping_cart';
import { useDispatch } from 'react-redux';


function Counter({ quantity, item }) {
    const [count, setCount] = useState(quantity);
    // const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch()

    const handleCountChange = async (e) => {
        e.preventDefault()
        const value = parseInt(e.target.value);
        // console.log("///////////////")
        setCount(value);
        await dispatch(thunkUpdateCartItemQuantityInDb(value, item))
        await dispatch(getCartThunk())
    };

    // useEffect(async () => {
    //     await dispatch(thunkUpdateCartItemQuantityInDb(count, item))
    // }, [dispatch, count]);


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
            <select value={count} onChange={((e) => handleCountChange(e))}>
                {options}
            </select>
        </div>
    );
}

export default Counter;
