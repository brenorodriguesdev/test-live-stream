"use client"

import React, { useEffect } from 'react';
import Hls from 'hls.js';

const serverHLS = String(process.env.NEXT_PUBLIC_HLS);

export default function Home() {
  useEffect(() => {
    const video = document.getElementById('video') as HTMLVideoElement;

    if (Hls.isSupported()) {
      const hls = new Hls({
        liveSyncDuration: 3, // Set live sync duration to reduce latency
        liveMaxLatencyDuration: 5, // Maximum latency allowed
      });
      hls.loadSource(serverHLS);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
      });

      // Reconnect logic for live streaming
      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.type === 'networkError' || data.details === 'bufferStalledError') {
          hls.stopLoad();
          hls.startLoad();
        }
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = serverHLS;
      video.addEventListener('loadedmetadata', () => {
        video.play();
      });

      // Reconnect logic for native HLS support
      video.addEventListener('error', () => {
        video.src = '';
        setTimeout(() => {
          video.src = serverHLS;
          video.play();
        }, 5000); // Retry every 5 seconds
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
