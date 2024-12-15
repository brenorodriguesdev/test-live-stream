"use client"

import React, { useEffect, useState } from 'react';
import Hls from 'hls.js';

const serverHLS = String(process.env.NEXT_PUBLIC_HLS);

export default function Home() {
  const [isLive, setIsLive] = useState(false);

  const handleGoLive = () => {
    setIsLive(true);
  };

  useEffect(() => {
    if (!isLive) return;

    const video = document.getElementById('video') as HTMLVideoElement;

    if (Hls.isSupported()) {
      const hls = new Hls({
        liveSyncDuration: 0.2, // Sincronização de 200ms para minimizar a latência
        liveMaxLatencyDuration: 1, // Permitir atraso máximo de 1 segundo antes de forçar a sincronização
        maxBufferLength: 1, // Buffer máximo de 1 segundo
        maxLiveSyncPlaybackRate: 1.5, // Permitir reprodução mais rápida para reduzir o atraso
        startPosition: -1 // Começar a reprodução o mais próximo possível do "live edge"
      });
      hls.loadSource(serverHLS);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
      });

      // Lógica de reconexão para streaming ao vivo
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

      // Lógica de reconexão para suporte nativo ao HLS
      video.addEventListener('error', () => {
        video.src = '';
        setTimeout(() => {
          video.src = serverHLS;
          video.play();
        }, 5000); // Tentar novamente a cada 5 segundos
      });
    }
  }, [isLive]);

  return (
    <div>
      <h1>Live Stream</h1>
      {!isLive && (
        <button 
          onClick={handleGoLive} 
          style={{ 
            padding: '10px 20px', 
            fontSize: '16px', 
            marginBottom: '20px', 
            cursor: 'pointer', 
            backgroundColor: '#007BFF', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px' 
          }}
        >
          Go Live
        </button>
      )}
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
