import { useMemo, useRef, useState } from 'react';

const TRACKS = [
  {
    title: 'Background Track 1',
    src: '/media/audio/track-1.mp3',
  },
  {
    title: 'Background Track 2',
    src: '/media/audio/track-2.mp3',
  },
];

export function MusicSlider() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [trackIndex, setTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const activeTrack = useMemo(() => TRACKS[trackIndex], [trackIndex]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const onVolumeChange = (nextVolume: number) => {
    setVolume(nextVolume);
    if (audioRef.current) {
      audioRef.current.volume = nextVolume;
    }
  };

  const nextTrack = () => {
    const next = (trackIndex + 1) % TRACKS.length;
    setTrackIndex(next);
    setIsPlaying(false);
  };

  return (
    <section className="music-widget" aria-label="Background music controls">
      <audio
        key={activeTrack.src}
        ref={audioRef}
        loop
        onEnded={nextTrack}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      >
        <source src={activeTrack.src} type="audio/mpeg" />
      </audio>

      <button type="button" onClick={togglePlay} className="music-button">
        {isPlaying ? 'Pause' : 'Play'}
      </button>

      <button type="button" onClick={nextTrack} className="music-button ghost">
        Next
      </button>

      <label className="volume">
        Vol
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(event) => onVolumeChange(Number(event.target.value))}
        />
      </label>

      <p className="track-title">{activeTrack.title}</p>
    </section>
  );
}
