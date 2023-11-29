import Container from 'react-bootstrap/Container';
import styles from './header.module.css'

export const Header = () => {

    return (
        <Container className="fs-2">
            <div>
                <img src="https://ldwcsapp1472.s3.ap-northeast-2.amazonaws.com/image/busanit.JPG" className={styles.imageClass}/>
            </div>
        </Container>
    )
}
