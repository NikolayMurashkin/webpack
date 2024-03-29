import { useState } from 'react';
import styles from './App.module.scss';

export const App = () => {
    const [count, setCount] = useState<number>(0);

    const increment = () => setCount((prev) => prev + 1);
    const decrement = () => setCount((prev) => prev - 1);
    const clear = () => setCount(0);
    return (
        <div>
            {count}
            <button className={styles.button} onClick={increment}>
                increment
            </button>
            <button className={styles.button} onClick={decrement}>
                decrement
            </button>
            <button className={styles.button} onClick={clear}>
                clear
            </button>
        </div>
    );
};
