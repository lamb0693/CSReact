import React from 'react'
import Container from 'react-bootstrap/Container';
import styles from './footer.module.css'

export const Footer = () => {
    return (
        <Container className="fs-2">
            <div className={styles.line1}>
                부산 It 교육센터
            </div>
            <div className={styles.line2}>
                상담전화 051-0000-0000  email : admin@busanit.com 주소  부산시 부산진구
            </div>  
        </Container>
    )
}
