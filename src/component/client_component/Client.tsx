import React, { useEffect } from 'react'
import io from "socket.io-client";
import { useState } from 'react';

// type ClientProps = {
//     name : string
// }

//export const Client = (props : ClientProps) => {

    // const socket = io("localhost:3002")
    
    // let audioContext: AudioContext | null = null;

    // const [btnStartDisabled, setBtnStartDisabled] = useState(false)
    // const [btnStopDisabled, setBtnStopDisabled] = useState(true)


    // // Start recording when the "Start Recording" button is clicked.
    // const startRecording = () : void => {
    //     console.log("startRecording")
    //     setBtnStartDisabled(true)
    //     setBtnStopDisabled(false)
    // }

    // const stopRecording = () : void => {
    //     console.log("stopRecording")
    //     setBtnStartDisabled(false)
    //     setBtnStopDisabled(true)
    // }


    // let micStream: MediaStream | null = null;


        
    // const startStreaming = async () : Promise<void> => {
    //     // Access the user's microphone and create an audio stream.
    //     try{
    //         micStream = await navigator.mediaDevices.getUserMedia({ audio: true })

    //         micStream.addEventListener('dataavailable', (event)=> {
    //             if (event.data.size > 0) {
    //                 socket.emit('audioData', event.data)
    //             }
    //         })

    //         setBtnStartDisabled(true);
    //         setBtnStopDisabled(false);
    //     } catch(err) {
    //         console.log(err)
    //     }


    //     const stopRecording = () : void => {
    //         if (micStream) {
    //             micStream.getTracks().forEach((track) => track.stop());
    //         }

    //         setBtnStartDisabled(false);
    //         setBtnStopDisabled(true);
    //     };


    // }
    
    // useEffect(() => {
    //     return () => {
    //     stopRecording();
    //     };
    // }, []);
    
    // return (

    //     <div>
    //         <h1>{props.name}</h1>
    //         <button onClick={startRecording} disabled={btnStartDisabled}>Start Recording</button>
    //         <button onClick={stopRecording} disabled={btnStopDisabled}>Stop Recording</button>
    //     </div>

    // )
//}