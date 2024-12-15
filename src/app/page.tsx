"use client"
import { useEffect, useRef } from 'react';
import flvjs from 'flv.js';

export default function Home() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (flvjs.isSupported()) {
      const videoElement = videoRef.current;
      const flvPlayer = flvjs.createPlayer({
        type: 'flv',
        url: 'http://18.231.123.67:8080/live/livestream.flv'
      });
      
      if (videoElement) {
        flvPlayer.attachMediaElement(videoElement);
        flvPlayer.load();
        flvPlayer.play();
      }

      return () => {
        flvPlayer.destroy();
      };
    }
  }, []);

  return (
    <div>
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