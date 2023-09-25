import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

type OptionCardType = {
    title : string,
    text : string,
    imageURL : string,
    href : string
}

export const OptionCard = (props : OptionCardType) => {

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={props.imageURL} />
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>
                    {props.text}
                </Card.Text>
                <Button variant="primary"><a href={props.href}>바로 가기</a></Button>
            </Card.Body>
        </Card>
    )
}