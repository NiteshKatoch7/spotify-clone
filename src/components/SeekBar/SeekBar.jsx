import React from 'react'
import { SeekerWrapper } from './SeekBarStyle';

export default function SeekBar({ currentTime, duration, className, onChange }) {
    const handleChange = (event) => {
      const newTime = (event.target.value / 100) * duration;
      onChange(newTime);
    };
    
  return (
    <SeekerWrapper className={className}>
      <input
        className=''
        type="range"
        min="0"
        max="100"
        value={(currentTime / duration) * 100}
        onChange={handleChange}
      />
    </SeekerWrapper>
  )
}
