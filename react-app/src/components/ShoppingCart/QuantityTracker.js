// import React, { useState } from 'react';

// function Counter() {
//     const [count, setCount] = useState(0);

//     const handleIncrement = () => {
//         if (count === 50) {
//             return
//         }
//         setCount(count + 1);
//     };

//     const handleDecrement = () => {
//         if (count === 0) {
//             return
//         }
//         setCount(count - 1);
//     };

//     return (
//         <div>
//             <button onClick={handleDecrement}>-</button>
//             <span>{count}</span>
//             <button onClick={handleIncrement}>+</button>
//         </div>
//     );
// }

// export default Counter;

import React, { useState } from 'react';

function Counter({quantity}) {
    const [count, setCount] = useState(quantity);

    const handleCountChange = (event) => {
        const value = parseInt(event.target.value);
        setCount(value);
    };

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
