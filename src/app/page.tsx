"use client"

import React, { useEffect } from 'react';
import Hls from 'hls.js';

const serverHLS = String(process.env.NEXT_PUBLIC_HLS)

export default function Home() {
  useEffect(() => {
    const video = document.getElementById('video') as HTMLVideoElement;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(serverHLS); // Coloque a URL do seu arquivo m3u8 aqui
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = serverHLS;
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