import React from 'react'

import Container from 'react-bootstrap/Container';
import styles from './client_home.module.css' 

export const ClientHome = () => {

    return (
        <Container style={{paddingTop : "2vh"}}>
            <div className={styles.imageDiv}>
                <img src="/image/home.JPG" className={styles.imageClass} alt="academy"/>
            </div>

         </Container>
    );
}