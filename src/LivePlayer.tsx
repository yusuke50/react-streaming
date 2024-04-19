import { useEffect, useRef, useState } from 'react';
import JSMpeg from '@cycjimmy/jsmpeg-player';

type JSMpegPlayerProps = {
  width: number;
  height: number;
  className?: string;
};

export default function LivePlayer({
  width,
  height,
  className,
}: JSMpegPlayerProps) {
  const socketUrl: string = 'ws://dev-server.site:8765';
  const remoteRef = useRef<HTMLDivElement | null>(null);
  const webSocketRef = useRef<WebSocket | null>(null);
  const [isWebSocketReady, setIsWebSocketReady] = useState(false);
  let videoR: any = null;

  useEffect(() => {
    if (!remoteRef.current) {
      return;
    }

    const socketConnecting = () => {
      webSocketRef.current = new WebSocket(socketUrl);
      webSocketRef.current.onopen = () => {
        console.log('ws connecting');
        setIsWebSocketReady(true);
      };
      webSocketRef.current.onerror = (error) => {
        console.error('ws error: ', error);
        setIsWebSocketReady(false);
        setTimeout(() => {
          socketConnecting();
        }, 1500);
      };
      webSocketRef.current.onclose = () => {
        console.log('ws closed');
        setIsWebSocketReady(false);
      };
      webSocketRef.current.onmessage = (event) => {
        console.log(new Date().getTime());
      };
    };
    socketConnecting();

    if (isWebSocketReady) {
      videoR = new JSMpeg.VideoElement(
        remoteRef.current,
        webSocketRef.current.url,
        { poster: '/src/assets/streaming.jpg' },
        { protocols: [] }
      );

      console.log(videoR);
    }

    return () => {
      if (
        webSocketRef.current &&
        webSocketRef.current.readyState === webSocketRef.current.OPEN
      ) {
        webSocketRef.current.close();
        webSocketRef.current = null;
        videoR.destroy();
      }
    };
  }, [socketUrl, isWebSocketReady]);

  return (
    <div
      ref={remoteRef}
      className={className}
      style={{ width: width, height: height, margin: '0 auto' }}
    />
  );
}
