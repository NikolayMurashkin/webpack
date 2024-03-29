import { useState } from 'react';

export const App = () => {
    const [count, setCount] = useState<number>(0);

    const increment = () => setCount((prev) => prev + 1);
    const decrement = () => setCount((prev) => prev - 1);
    const clear = () => setCount(0);
    return (
        <div>
            {count}
            <button onClick={increment}>increment</button>
            <button onClick={decrement}>decrement</button>
            <button onClick={clear}>clear</button>
        </div>
    );
};
