import React from 'react'
import { TrackContainer } from './TrackItemStyle';

export default function TrackItem({track, isSelected, onSelect}) {
    let trackCover = `https://cms.samespace.com/assets/${track.cover}`;
  return (
    <TrackContainer onClick={onSelect} className="flex items-center justify-between rounded-md cursor-pointer">
      <div className="flex items-center">
        <img src={trackCover} alt="" className="w-10 h-10 rounded-md mr-3" />
        <div>
          <p className="track-name font-medium text-sm text-gray-200">{track.name}</p>
          <p className="track-artist text-xs text-gray-400">{track.artist}</p>
        </div>
      </div>
      <span className="duration text-xs text-gray-400">{track.duration}</span>
    </TrackContainer>
  )
}
