import { Container } from "react-bootstrap"
import styles from './paintImage.module.css'
import { useEffect, useRef } from "react"

type Point = {
    x : number,
    y : number
}

type PaintImagePropsType = {
    paint : Array<Array<Point>>
}


export const PaintImage = (props : PaintImagePropsType) => {

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
 
    useEffect( ()=> {
        const canvas = canvasRef.current;

        if (canvas) {
            // Access the canvas context and draw your paint data here
            const context = canvas.getContext('2d');

            context?.clearRect(0, 0, canvas.width, canvas.height);

            if (context) {
                props.paint.forEach((line) => {
                    if (line.length < 2) return;

                    context.beginPath();
                    context.moveTo(line[0].x/2, line[0].y/2);

                    for (let i = 1; i < line.length; i++) {
                        context.lineTo(line[i].x/2, line[i].y/2);
                    }

                    context.stroke();
                });
            }
        }
    })
    

    return (
        <Container>
            <canvas ref={canvasRef} className={styles.canvasClass} width="600" height="900"></canvas>
        </Container>
    )
}