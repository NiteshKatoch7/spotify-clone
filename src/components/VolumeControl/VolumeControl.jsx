import React, { useEffect, useState } from 'react'
import { MdVolumeUp } from 'react-icons/md';
import { VolumeControllerWrapper } from './VolumeControlStyle';
import { useSelector } from 'react-redux';
import { HiVolumeOff } from 'react-icons/hi';

export default function VolumeControl({ audioRef }) {
    const [isOpen, setIsOpen] = useState(false);
    const [volume, setVolume] = useState(50);
    const [isMuted, setIsMuted] = useState(false);
    const { selectedColor } = useSelector((state) => state.tracks);
  
    const toggleVolumeControl = () => {
      setIsOpen(!isOpen);
    };
  
    const handleVolumeChange = (e) => {
        const newVolume = e.target.value;
        setVolume(newVolume);
        if (audioRef.current) {
          audioRef.current.volume = newVolume / 100;
        }

        if(parseInt(newVolume) === 0){
            setIsMuted(true);
        }else{
            setIsMuted(false);
        }
    };

    useEffect(() => {
      if (audioRef.current) {
        audioRef.current.volume = volume / 100;
      }
    }, [audioRef, volume]);

    return (
      <VolumeControllerWrapper>
          <button
            onClick={toggleVolumeControl}>
                {
                    isMuted ? 
                        <HiVolumeOff size={24} color="white" />
                    : <MdVolumeUp size={24} color="white" />
                }
          </button>

          {isOpen && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-8 h-32 bg-white rounded-full shadow-lg flex items-center justify-center">
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
                className="w-24 h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer transform -rotate-90"
                style={{
                  WebkitAppearance: 'none',
                  background: `linear-gradient(to right, ${selectedColor} 0%, ${selectedColor} ${volume}%, #ddd ${volume}%, #ddd 100%)`,
                }}
              />
            </div>
          )}
      </VolumeControllerWrapper>
    )
}
