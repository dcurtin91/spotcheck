import React, { useState, useRef } from 'react';
export default function Upload() {
    const [audioSrc, setAudioSrc] = useState(null);
    const audioElement = useRef(null);



    const handleSubmit = (event) => {
        if (event.target.files[0]) {
            setAudioSrc(URL.createObjectURL(event.target.files[0]));
        }
    }


    const handlePlay = () => {

        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const ANALYSER = audioCtx.createAnalyser();
        const SOURCE = audioCtx.createMediaElementSource(audioElement.current);
        SOURCE.connect(ANALYSER);
        ANALYSER.connect(audioCtx.destination);
        const CVS = document.querySelector('.visualizer');
        const CTX = CVS.getContext('2d', { willReadFrequently: true });
        const W = CVS.width = window.innerWidth - 380;
        const H = CVS.height = window.innerHeight - 200;



        ANALYSER.fftSize = 4096;




        const DATA = new Uint8Array(ANALYSER.frequencyBinCount);
        const LEN = DATA.length;
        const h = H / LEN;
        const x = W - 1;
        CTX.fillStyle = 'hsl(280, 100%, 10%)';
        CTX.fillRect(0, 0, W, H);

        loop();

        function loop() {
            window.requestAnimationFrame(loop);
            let imgData = CTX.getImageData(1, 0, W - 1, H);
            CTX.putImageData(imgData, 0, 0);
            ANALYSER.getByteFrequencyData(DATA);
            for (let i = 0; i < LEN; i++) {
                let rat = DATA[i] / 255;
                let hue = Math.round((rat * 120) + 280) % 360;
                let sat = '100%';
                let lit = 10 + (70 * rat) + '%';
                CTX.beginPath();
                CTX.strokeStyle = `hsl(${hue}, ${sat}, ${lit})`;
                CTX.moveTo(x, H - (i * h));
                CTX.lineTo(x, H - (i * h + h));
                CTX.stroke();

            }
        }

    }
    return (
        <div>
            <h1 className="upload">Upload Audio</h1>
            <div className="file">
                <input type="file" onChange={handleSubmit} />

            </div>
            <div className="player">
                <audio
                    ref={audioElement}
                    controls
                    src={audioSrc}
                    onPlay={handlePlay}


                />
            </div>
        </div>
    );
}