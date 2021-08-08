import React from 'react';
import styles from './Loading.module.css'
import SvgWorldCoinsSpinner from './worldCoinsSpinner'

const Loading = () => {
    return <div className={styles.container}>
        <SvgWorldCoinsSpinner />
        <h1>Loading</h1>

    </div>;
};

export default Loading;