import { useState, useEffect } from 'react';

const getAudioDuration = (audioUrl) => {
  return new Promise((resolve, reject) => {
    const audio = new Audio(audioUrl);
    audio.addEventListener('loadedmetadata', () => {
      const durationInSeconds = Math.floor(audio.duration);
      const minutes = Math.floor(durationInSeconds / 60);
      const seconds = durationInSeconds % 60;
      const formattedDuration = `${minutes}:${seconds.toString().padStart(2, '0')}`;
      resolve(formattedDuration);
    });
    audio.addEventListener('error', (event) => {
      reject(event);
    });
  });
};

const useFetch = (url, activeTab) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        const result = await response.json();

        const tracksWithDuration = await Promise.all(
          result.data.map(async (track) => {
            const duration = await getAudioDuration(track.url);
            return { ...track, duration };
          })
        ); 
        
        const filteredTracks = activeTab === "topTracks" 
          ? tracksWithDuration.filter(track => track.top_track === true)
          : tracksWithDuration;

        setData(filteredTracks);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [url, activeTab]);

  return { data, loading, error };
};

export default useFetch;