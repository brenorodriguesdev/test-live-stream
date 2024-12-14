"use client"

import React, { useEffect } from 'react';
import Hls from 'hls.js';

export default function Home() {
  useEffect(() => {
    const video = document.getElementById('video') as HTMLVideoElement;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource('http://18.215.183.34/hls/stream.m3u8'); // Coloque a URL do seu arquivo m3u8 aqui
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = 'http://18.215.183.34/hls/stream.m3u8';
      video.addEventListener('loadedmetadata', () => {
        video.play();
      });
    }
  }, []);

  return (
    <div>
      <h1>Live Stream</h1>
      <video
        id="video"
        controls
        autoPlay
        width="1920"
        height="768"
        style={{ backgroundColor: 'black' }}
      ></video>
    </div>
  );
}