import React from 'react'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { OptionCard } from './client_component/OptionCard';
import styles from './client_home.module.css' 

export const ClientHome = () => {

    return (
        <Container style={{paddingTop : "2vh"}}>
            <div>
                <img src="/image/home.JPG" className={styles.imageClass}/>
            </div>

            {/* <Row>
                <Col><OptionCard title="글 전달하기" text="상담원에 글을 전달하려면 여기를 클릭하세요"
                         imageURL="/image/keyboard.JPG" href="#"/></Col>
                <Col><OptionCard title="그림 전달하기" text="상담원에 그림을 전달하려면 여기를 클릭하세요"
                         imageURL="/image/keyboard.JPG" href="#"/></Col>
                <Col><OptionCard title="음성 전달하기" text="상담원에 음성을 전달하려면 여기를 클릭하세요"
                         imageURL="/image/keyboard.JPG" href="#"/></Col>
            </Row> */}
        </Container>
    );
}