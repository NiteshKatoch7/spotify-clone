import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AudioContainer, ButtonGroup, MainWrapper, PlayerContainer, PlayListBtn, playListBtn } from './MainContainerStyle';
import { selectAndPlaySong, setMobMenu, setPlaybackState, setSelectedSong } from '../../redux/reducers/tracksSlice';
import MainContainerLoader from './MainContainerLoader';
import FloatingHeader from './FloatingHeader';
import { FaPause, FaPlay } from 'react-icons/fa';
import SeekBar from '../SeekBar/SeekBar';
import VolumeControl from '../VolumeControl/VolumeControl';
import { BsThreeDots, BsThreeDotsVertical } from 'react-icons/bs';

export default function MainContainer() {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const { selectedSong, status, isPlaying, tracks, selectedColor, shouldPlayOnSelect } = useSelector((state) => state.tracks);
  const dispatch = useDispatch();
  const audioRef = useRef(null);

    useEffect(() => {
      if (selectedSong && audioRef.current) {
        audioRef.current.src = `${selectedSong.url}`;
        if (shouldPlayOnSelect) {
          audioRef.current.play();
          dispatch(setPlaybackState(true));
        }
      }
    }, [selectedSong, shouldPlayOnSelect, dispatch]);

    const handlePlayPause = () => {
      if (audioRef.current) {
        if (isPlaying) {
          audioRef.current.pause();
        } else {
          audioRef.current.play();
        }
        dispatch(setPlaybackState(!isPlaying));
      }
    };

    useEffect(() => {
      if (audioRef.current) {
        audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
        audioRef.current.addEventListener('durationchange', handleDurationChange);
      }
  
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
          audioRef.current.removeEventListener('durationchange', handleDurationChange);
        }
      };
    }, []);
  
    const handleTimeUpdate = () => {
      setCurrentTime(audioRef.current.currentTime);
    };
  
    const handleDurationChange = () => {
      setDuration(audioRef.current.duration);
    };

    const handleNextSong = () => {
      const currentIndex = tracks.findIndex((track) => track.id === selectedSong.id);
      if(currentIndex !== -1 && currentIndex < tracks.length - 1){
        dispatch(selectAndPlaySong(tracks[currentIndex + 1]));
      }
    }

    const handlePrevSong = () => {
      const currentIndex = tracks.findIndex((track) => track.id === selectedSong.id);
      if(currentIndex !== -1 && currentIndex > 0){
        dispatch(selectAndPlaySong(tracks[currentIndex - 1]));
      }
    }

    const handleMobMenu = () => {
      dispatch(setMobMenu(true));
    }

    const handleSeekBarChange = (newTime) => {
      setCurrentTime(newTime);
      audioRef.current.currentTime = newTime;
    };
    
    return (
      <MainWrapper className="md:w-[55%] w-full p-4 flex align-center">
          <PlayerContainer className="flex flex-col lg:justify-center align-center w-full lg:m-auto">
              {status === 'loading' ? (
                <MainContainerLoader />
              ) : status === 'failed' ? (
                <p>Something is wrong!</p>
              ) : selectedSong ? (
                <div className="header-body">
                  <div className="header flex justify-between items-center mb-6">
                    <div className="left">
                      <h2 className="text-2xl font-bold">
                        {selectedSong.name}
                      </h2>
                      <p className="text-gray-400">
                          {selectedSong.artist}
                      </p>
                    </div>
                    <div className="right">
                      <PlayListBtn selectedColor={selectedColor} className='font-bold' onClick={handleMobMenu}>Playlist</PlayListBtn>
                    </div>
                  </div>
                  <div className="img-container m-auto mb-4">
                      {<img src={`https://cms.samespace.com/assets/${selectedSong.cover}`} alt="" className="w-full h-full rounded-md" />}
                  </div>
                </div>
              ) : (
                <p>No song selected</p>
              )}
              
              <AudioContainer>
                <audio ref={audioRef} />
                <div className="progress-bar">
                  <div
                    className="progress"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  ></div>
                  <SeekBar
                    currentTime={currentTime}
                    duration={duration}
                    className="seekbar w-full"
                    onChange={handleSeekBarChange}
                  />
                </div>
              </AudioContainer>

              {/* Playback controls */}
              <div className="flex justify-between items-center">
                <div className="left-control">
                  <button className='options-btn'>
                    <BsThreeDots size={24} color="white" />
                  </button>
                </div>
                <ButtonGroup className="button-group flex align-center gap-5">
                  <button 
                    className="control-btn prev-control" 
                    onClick={handlePrevSong}
                    disabled={selectedSong && tracks.findIndex((track) => track.id === selectedSong.id) === 0}
                    >
                    <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g opacity="1">
                      <path d="M24.712 8.38937C24.9529 8.2286 25.233 8.13627 25.5223 8.12222C25.8117 8.10816 26.0994 8.17292 26.3548 8.30957C26.6102 8.44623 26.8237 8.64966 26.9726 8.89816C27.1214 9.14665 27.2 9.4309 27.2 9.72057V22.5206C27.2 22.8102 27.1214 23.0945 26.9726 23.343C26.8237 23.5915 26.6102 23.7949 26.3548 23.9316C26.0994 24.0682 25.8117 24.133 25.5223 24.1189C25.233 24.1049 24.9529 24.0125 24.712 23.8518L16 18.0438V22.5206C16 22.8102 15.9214 23.0945 15.7726 23.343C15.6237 23.5915 15.4102 23.7949 15.1548 23.9316C14.8994 24.0682 14.6117 24.133 14.3223 24.1189C14.033 24.1049 13.7529 24.0125 13.512 23.8518L3.91195 17.4518C3.69282 17.3056 3.51315 17.1077 3.38888 16.8755C3.26462 16.6433 3.19959 16.3839 3.19959 16.1206C3.19959 15.8572 3.26462 15.5979 3.38888 15.3657C3.51315 15.1334 3.69282 14.9355 3.91195 14.7894L13.512 8.38937C13.7529 8.2286 14.033 8.13627 14.3223 8.12222C14.6117 8.10816 14.8994 8.17292 15.1548 8.30957C15.4102 8.44623 15.6237 8.64966 15.7726 8.89816C15.9214 9.14665 16 9.4309 16 9.72057V14.1974L24.712 8.38937Z" fill="white"/>
                      </g>
                    </svg>
                  </button>
                  <button className="music-control" onClick={handlePlayPause}>
                    {isPlaying ? (
                      <FaPause size={24} color="black" />
                    ) : (
                      <FaPlay size={20} color="black" />
                    )}
                  </button> 
                  <button 
                    className="control-btn nxt-control" 
                    onClick={handleNextSong}
                    disabled={selectedSong && tracks.findIndex((track) => track.id === selectedSong.id) === tracks.length - 1}
                    >
                    <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g opacity="1">
                      <path d="M7.28805 8.38937C7.04709 8.2286 6.767 8.13627 6.47768 8.12222C6.18835 8.10816 5.90063 8.17292 5.64522 8.30957C5.38982 8.44623 5.1763 8.64966 5.02745 8.89816C4.8786 9.14665 4.80001 9.4309 4.80005 9.72057V22.5206C4.80001 22.8102 4.8786 23.0945 5.02745 23.343C5.1763 23.5915 5.38982 23.7949 5.64522 23.9316C5.90063 24.0682 6.18835 24.133 6.47768 24.1189C6.767 24.1049 7.04709 24.0125 7.28805 23.8518L16 18.0438V22.5206C16 22.8102 16.0786 23.0945 16.2274 23.343C16.3763 23.5915 16.5898 23.7949 16.8452 23.9316C17.1006 24.0682 17.3883 24.133 17.6777 24.1189C17.967 24.1049 18.2471 24.0125 18.488 23.8518L28.088 17.4518C28.3072 17.3056 28.4869 17.1077 28.6111 16.8755C28.7354 16.6433 28.8004 16.3839 28.8004 16.1206C28.8004 15.8572 28.7354 15.5979 28.6111 15.3657C28.4869 15.1334 28.3072 14.9355 28.088 14.7894L18.488 8.38937C18.2471 8.2286 17.967 8.13627 17.6777 8.12222C17.3883 8.10816 17.1006 8.17292 16.8452 8.30957C16.5898 8.44623 16.3763 8.64966 16.2274 8.89816C16.0786 9.14665 16 9.4309 16 9.72057V14.1974L7.28805 8.38937Z" fill="white"/>
                      </g>
                    </svg>
                  </button>
                </ButtonGroup>
                <div className="right-control">
                    <VolumeControl audioRef={audioRef} />
                </div>
              </div>
          </PlayerContainer>
          <FloatingHeader />
      </MainWrapper>
    )
}
