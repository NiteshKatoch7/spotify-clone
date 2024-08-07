import React, { useEffect, useMemo, useState } from 'react';
import TrackItem from './TrackItem';
import useFetch from './useFetch';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTracks, setSelectedSong } from '../redux/reducers/tracksSlice';

export default function ListSidebar() {
  const [activeTab, setActiveTab] = useState('forYou');
  const [searchTerm, setSearchTerm] = useState('');

  const url = activeTab === 'forYou' 
    ? 'https://cms.samespace.com/items/songs' 
    : 'https://cms.samespace.com/items/songs';

  const dispatch = useDispatch();
  const { tracks, status, error, selectedSong } = useSelector((state) => state.tracks);

  useEffect(() => {
    dispatch(fetchTracks({ url, activeTab }));
  }, [dispatch, url, activeTab]);

  const filteredTracks = useMemo(() => {
    if (!tracks) return [];
    return tracks.filter(track =>
      track.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      track.artist.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [tracks, searchTerm]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  }

  const handleTrackSelect = (track) => {
    dispatch(setSelectedSong(track));
  };

  return (
    <div className="w-[25%] p-4">
      <nav className="mb-4">
        <ul className="flex border-b border-gray-700">
          <li className="mr-1">
            <button
              onClick={() => setActiveTab('forYou')}
              className={`bg-[#121212] inline-block py-2 px-4 font-semibold ${
                activeTab === 'forYou' ? 'text-blue-500' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              For You
            </button>
          </li>
          <li className="mr-1">
            <button
              onClick={() => setActiveTab('topTracks')}
              className={`bg-[#121212] inline-block py-2 px-4 font-semibold ${
                activeTab === 'topTracks' ? 'text-blue-500' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              Top Tracks
            </button>
          </li>
        </ul>
      </nav>
      <input value={searchTerm} onChange={handleSearch} type="text" placeholder="Search Song, Artist" className="w-full p-2 rounded bg-gray-800 mb-4" />
      <div className="tracks-list space-y-1">
        {status === 'loading' ? (
          <p>Loading...</p>
        ) : status === 'failed' ? (
          <p>Error: {error}</p>
        ) : (
          filteredTracks && filteredTracks.length > 0 ? (
            filteredTracks.map((track, index) => 
            <TrackItem 
              key={index} 
              track={track} 
              isSelected={selectedSong && selectedSong.id === track.id}
              onSelect={() => handleTrackSelect(track)} />
            )
          ) : (
            <p>No tracks available</p>
          )
        )}
      </div>
    </div>
  );
}