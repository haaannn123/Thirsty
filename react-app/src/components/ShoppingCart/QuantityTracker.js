import React, { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);

    const handleIncrement = () => {
        if (count === 50) {
            return
        }
        setCount(count + 1);
    };

    const handleDecrement = () => {
        if (count === 0) {
            return
        }
        setCount(count - 1);
    };

    return (
        <div>
            <button onClick={handleIncrement}>+</button>
            <span>{count}</span>
            <button onClick={handleDecrement}>-</button>
        </div>
    );
}

export default Counter;
