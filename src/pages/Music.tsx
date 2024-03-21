import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

export const Music = () => {
  return <div className='w-[700px] min-h-screen'></div>;
  <AudioPlayer
    src='https://youtu.be/bUp9piH_zgY'
    className='h-30 rounded-xl'
  />;
};
