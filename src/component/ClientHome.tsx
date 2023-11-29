import React from 'react'

import Container from 'react-bootstrap/Container';
import styles from './client_home.module.css' 

export const ClientHome = () => {

    return (
        <Container style={{paddingTop : "2vh"}}>
            <div className={styles.imageDiv}>
                <img src="https://ldwcsapp1472.s3.ap-northeast-2.amazonaws.com/image/home.JPG" className={styles.imageClass} alt="academy"/>
            </div>

         </Container>
    );
}