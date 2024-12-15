"use client"
import { useEffect, useRef, useState } from 'react';
import flvjs from 'flv.js';

export default function Home() {
  const [isLive, setIsLive] = useState(false);
  const videoRef = useRef(null);

  const handleGoLive = () => {
    setIsLive(true);
  };

  useEffect(() => {
    if (!isLive) return;

    if (flvjs.isSupported()) {
      const videoElement = videoRef.current;
      const flvPlayer = flvjs.createPlayer({
        type: 'flv',
        url: 'http://18.231.123.67:8080/live/livestream.flv'
      });

      flvPlayer.attachMediaElement(videoElement);
      flvPlayer.load();
      flvPlayer.play();

      return () => {
        flvPlayer.destroy();
      };
    }
  }, [isLive]);

  return (
    <div>
      <h1>Live Stream</h1>
      {!isLive && (
        <button onClick={handleGoLive}>Go Live</button>
      )}
      <video 
        ref={videoRef} 
        controls 
        autoPlay 
        muted 
        width="1920" 
        height="768" 
      ></video>
    </div>
  );
}