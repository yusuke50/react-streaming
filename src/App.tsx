import { useState, useRef, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import JSMpeg from '@cycjimmy/jsmpeg-player';
import LivePlayer from './LivePlayer';


function App() {
  const [count, setCount] = useState(0);
  const playerRef = useRef<HTMLDivElement | null>(null);
  const url: String = '/bunny_640x360.ts';


  useEffect(() => {
    const video: any = new JSMpeg.VideoElement(
      playerRef.current,
      url,
      {poster: '/src/assets/cover.jpg'}
    );

    return () => {
      console.log('after local video')
    };
  }, [url]);

  return (
    <>
      <div className="video-player">
        <h4>Streaming Video</h4>
        <LivePlayer width={320} height={180} className={'remote'}></LivePlayer>
      </div>

      <hr />

      <div className='video-player'>
        <h4>Local Video</h4>
        <div
          ref={playerRef}
          className='jsmpeg'
          style={{ height: '180px', width: '320px', margin: '0 auto' }}
        ></div>
      </div>

      <hr />

      <div>
        <a href='https://vitejs.dev' target='_blank'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className='card'>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className='read-the-docs'>
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
