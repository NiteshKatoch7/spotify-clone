import React, { useEffect, useMemo, useState } from 'react';
import TrackItem from '../TrackItem/TrackItem';
import { InputContainer, ListContainer } from './ListSidebarStyle';
import useFetch from '../useFetch';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTracks, selectAndPlaySong, setMobMenu, setSelectedSong } from '../../redux/reducers/tracksSlice';
import search from '../../assets/images/search.svg';
import ListSidebarLoader from './ListSidebarLoader';
import { FaTimes } from 'react-icons/fa';

export default function ListSidebar() {
  const [activeTab, setActiveTab] = useState('forYou');
  const [searchTerm, setSearchTerm] = useState('');

  const url = activeTab === 'forYou' 
    ? 'https://cms.samespace.com/items/songs' 
    : 'https://cms.samespace.com/items/songs';

  const dispatch = useDispatch();
  const { tracks, status, error, selectedSong, selectedColor, mobMenu } = useSelector((state) => state.tracks);

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
    dispatch(selectAndPlaySong(track));
  };

  const handleMenuClose = () => {
    dispatch(setMobMenu(false));
  }

  return (
    <ListContainer selectedColor={selectedColor} className={`md:w-[50%] lg:w-[25%] p-4 ${ mobMenu ? 'active' : ''}`}>
      <nav className="mb-4">
        <ul className="flex gap-5">
          <li className="mr-1">
            <button
              onClick={() => setActiveTab('forYou')}
              className={`inline-block py-2 font-semibold ${
                activeTab === 'forYou' ? 'text-blue-500 active' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              For You
            </button>
          </li>
          <li className="mr-1">
            <button
              onClick={() => setActiveTab('topTracks')}
              className={`inline-block py-2 font-semibold ${
                activeTab === 'topTracks' ? 'text-blue-500 active' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              Top Tracks
            </button>
          </li>
        </ul>
      </nav>
      <InputContainer>
        <input value={searchTerm} onChange={handleSearch} type="text" placeholder="Search Song, Artist" className="search-input w-full p-2 rounded bg-gray-800" />
        <img src={search} alt="Spotify" className="w-[32px]" />
      </InputContainer>
      <div className="tracks-list space-y-1">
        {status === 'loading' ? (
          <ListSidebarLoader />
        ) : status === 'failed' ? (
          <p className='px-4'>Error: {error}</p>
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
            <p className='px-4'>No tracks available</p>
          )
        )}
      </div>
      <button className="close-btn" onClick={handleMenuClose}>
        <FaTimes size={20} color="white" />
      </button>
    </ListContainer>
  );
}