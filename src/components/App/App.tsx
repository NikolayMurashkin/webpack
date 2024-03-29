import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import avatarPng from '@/assets/avatar.png';
import avatarJpg from '@/assets/avatar.jpg';
import Image from '@/assets/app-image.svg';
import styles from './App.module.scss';

export const App = () => {
    const [count, setCount] = useState<number>(0);

    const increment = () => setCount((prev) => prev + 1);
    const decrement = () => setCount((prev) => prev - 1);
    const clear = () => setCount(0);
    return (
        <div>
            <div>
                <img src={avatarPng} alt='avatar' width={50} height={50} />
                <img src={avatarJpg} alt='avatar' width={50} height={50} />
                <Image width={200} height={200} style={{ color: 'green' }} />
            </div>
            <Link to='/about'>About</Link>
            <br />
            <Link to='/shop'>Shop</Link>
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
            <Outlet />
        </div>
    );
};
