import Container from 'react-bootstrap/Container';
import styles from './header.module.css'

export const Header = () => {

    return (
        <Container className="fs-2">
            <div>
                <img src="/image/busanit.JPG" className={styles.imageClass}/>
            </div>
        </Container>
    )
}
