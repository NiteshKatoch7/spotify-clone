import React from 'react'

export default function TrackItem({track, isSelected, onSelect}) {
    let trackCover = `https://cms.samespace.com/assets/${track.cover}`;
  return (
    <div onClick={onSelect} className="flex items-center justify-between py-2 px-1 hover:bg-gray-800 rounded-md cursor-pointer">
      <div className="flex items-center">
        <img src={trackCover} alt="" className="w-10 h-10 rounded-md mr-3" />
        <div>
          <p className="font-medium text-sm text-gray-200">{track.name}</p>
          <p className="text-xs text-gray-400">{track.artist}</p>
        </div>
      </div>
      <span className="text-xs text-gray-400">{track.duration}</span>
    </div>
  )
}
