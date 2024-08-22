import React, { useCallback, useEffect, useRef, useState } from 'react';
import './Player.scss';
import { useDispatch, useSelector } from 'react-redux';
import { dislikeSong, likeSong } from '../user/userThunks.js';
import { playPause } from './playerSlice.js';
import { nextSong, prevSong } from '../queue/queueSlice.js';
import axios from '../../api/axios.js';
import { Link } from 'react-router-dom';
import {
  RiHeart2Fill,
  RiHeart2Line,
  RiPauseCircleFill,
  RiPlayCircleFill,
  RiRepeatOneLine,
  RiShuffleLine,
  RiSkipBackMiniFill,
  RiSkipForwardMiniFill,
  RiVolumeDownLine,
  RiVolumeMuteLine,
  RiVolumeUpLine,
} from 'react-icons/ri';

const Player = () => {
  const [volume, setVolume] = useState(100);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [repeatSong, setRepeatSong] = useState(false);

  const currentIndex = useSelector((state) => state.queue.current);
  const queue = useSelector((state) => state.queue.list);
  const song = queue[currentIndex];
  const { likedSongs } = useSelector((state) => state.user.data);
  const { isPlaying } = useSelector((state) => state.player);
  const dispatch = useDispatch();

  const audioRef = useRef();
  const progressRef = useRef();
  const playAnimationRef = useRef();
  const volumeRef = useRef();

  const repeat = useCallback(() => {
    const time = audioRef.current.currentTime;
    setCurrentTime(time);

    progressRef.current.value = time;
    progressRef.current.style.setProperty(
      '--range-progress',
      `${(progressRef.current.value / duration) * 100}%`,
    );

    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [audioRef, duration, progressRef, setCurrentTime]);

  useEffect(() => {
    // Prevent useEffect triggered before audio is loaded
    if (audioRef.current === undefined) return;

    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }

    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [isPlaying, audioRef, repeat]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume, audioRef]);

  // Increases plays count of the song
  useEffect(() => {
    const increaseCount = async () => {
      if (song) await axios.get(`/songs/${song.id}`);
    };
    increaseCount();
  }, [song]);

  const likeSongHandler = () => dispatch(likeSong(song.id));

  const dislikeSongHandler = () => dispatch(dislikeSong(song.id));

  // Music player
  const togglePlayPauseHandler = () => {
    dispatch(playPause());
  };

  const progressChangeHandler = () => {
    audioRef.current.currentTime = progressRef.current.value;
  };

  const volumeChangeHandler = (e) => {
    setVolume(e.target.value);
    e.target.style.setProperty('--range-progress', `${e.target.value}%`);
  };

  const onLoadedMetadataHandler = () => {
    const seconds = audioRef.current.duration;
    setDuration(seconds);
    progressRef.current.max = seconds;
  };

  const handleNext = () => {
    dispatch(nextSong());
  };

  const handlePrev = () => {
    dispatch(prevSong());
  };

  // TODO: Navigator control
  // navigator.mediaSession.setActionHandler('previoustrack', () => {
  //   dispatch(prevSong());
  // });
  //
  // navigator.mediaSession.setActionHandler('nexttrack', () => {
  //   dispatch(nextSong());
  // });
  //
  // navigator.mediaSession.setActionHandler('play', () => {
  //   dispatch(playPause());
  // });
  //
  // navigator.mediaSession.setActionHandler('pause', () => {
  //   dispatch(playPause());
  // });

  const onEndedHandler = () => {
    handleNext();
  };

  // Helper functions
  const formatTime = (time) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(time % 60);
      const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${formatMinutes}:${formatSeconds}`;
    }
    return '00:00';
  };

  const userLikedSong = () => {
    let likedSong = likedSongs.find((likedSong) => likedSong.id === song.id);
    return !!likedSong;
  };

  const repeatSongHandler = () => {
    setRepeatSong((state) => !state);
    audioRef.current.loop = !repeatSong;
  };

  return (
    <div className="player">
      {song ? (
        <>
          <div className="player__song">
            <img src={song.img} alt="" />
            <div className="player__song-context">
              <span className="player__song-name">{song.name}</span>
              <Link
                to={`/artist/${song.artist.id}`}
                className="player__song-artist"
              >
                {song.artist.name}
              </Link>
            </div>
            {userLikedSong() === true ? (
              <RiHeart2Fill
                className="player__song__like player__song__like--active"
                onClick={dislikeSongHandler}
              />
            ) : (
              <RiHeart2Line
                className="player__song__like"
                onClick={likeSongHandler}
              />
            )}
          </div>
          <div>
            <audio
              ref={audioRef}
              src={song.song}
              onLoadedMetadata={onLoadedMetadataHandler}
              onEnded={onEndedHandler}
              autoPlay={true}
            />

            <div className="player__icons">
              <RiShuffleLine />
              <RiSkipBackMiniFill onClick={handlePrev} />
              <button
                className="player__icon-btn"
                onClick={togglePlayPauseHandler}
              >
                {isPlaying ? (
                  <RiPauseCircleFill className="spinner" />
                ) : (
                  <RiPlayCircleFill />
                )}
              </button>
              <RiSkipForwardMiniFill onClick={handleNext} />
              {repeatSong ? (
                <RiRepeatOneLine
                  className={'player__repeat'}
                  onClick={repeatSongHandler}
                />
              ) : (
                <RiRepeatOneLine onClick={repeatSongHandler} />
              )}
            </div>
            <div className="player__range">
              <span className="player__range-time">
                {formatTime(currentTime)}
              </span>
              <input
                ref={progressRef}
                type="range"
                defaultValue={0}
                onChange={progressChangeHandler}
              />
              <span className="player__range-time">{formatTime(duration)}</span>
            </div>
          </div>
          <div className="player__volume">
            {Number(volume) === 0 ? (
              <RiVolumeMuteLine />
            ) : Number(volume) < 50 ? (
              <RiVolumeDownLine />
            ) : (
              <RiVolumeUpLine />
            )}
            <input
              ref={volumeRef}
              type="range"
              min={0}
              max={100}
              value={volume}
              defaultValue={100}
              onChange={(e) => volumeChangeHandler(e)}
            />
          </div>
        </>
      ) : (
        <div className="player__note">Please select a song 🐈 . . .</div>
      )}
    </div>
  );
};

export default Player;
