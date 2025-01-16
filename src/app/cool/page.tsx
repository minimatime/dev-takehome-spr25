'use client'
import { useSound } from 'use-sound';

export default function Kewl() {

  const [play, {stop}] = useSound('/surprise.mp3', {
    volume: 0.5,
  });
  {/*
      bro i need to fix these buttons and the audio pausing and playing
  */}

  const handleAudioClick = () => {
    stop();
    play();
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-primary text-white gap-5">
      <button 
        onClick={handleAudioClick}
        className='px-4 py-2 rounded-md bg-white text-primary'
      >
        audio to make life better but the music never stops
      </button> 
      
      <div className="flex flex-col max-w-md gap-4">
        <h1 className="text-2xl font-bold">Three fun facts about me:</h1>
        <p>1. I&apos;m a certified bog lover</p>
        <p>2. I&apos;m a certified caitvi lover</p>
        <p>3. Did you think I needed all the guards at the Hexgates?</p>
      </div>
    </div>
  );
}
