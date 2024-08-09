import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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

export const fetchTracks = createAsyncThunk(
  'tracks/fetchTracks',
  async ({ url, activeTab }) => {
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
      
    return filteredTracks;
  }
);

const tracksSlice = createSlice({
  name: 'tracks',
  initialState: {
    tracks: [],
    status: 'idle',
    error: null,
    selectedSong: null,
    selectedColor: '#000000',
    isPlaying: false,
    mobMenu: false,
    shouldPlayOnSelect: false,
  },
  reducers: {
    setSelectedSong: (state, action) => {
      state.selectedSong = action.payload;
      state.selectedColor = action.payload.accent || '#000000';
      state.isPlaying = state.shouldPlayOnSelect;
      state.shouldPlayOnSelect = false;
    },
    selectAndPlaySong: (state, action) => {
      state.shouldPlayOnSelect = true;
      state.selectedSong = action.payload;
      state.selectedColor = action.payload.accent || '#000000';
    },
    setPlaybackState: (state, action) => {
      state.isPlaying = action.payload;
    },
    setMobMenu: (state, action) => {
        state.mobMenu = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTracks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTracks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tracks = action.payload;
        
        if (action.payload.length > 0 && !state.selectedSong){
            state.selectedSong = action.payload[0];
            state.selectedColor = action.payload[0].accent || '#000000';
        }
      })
      .addCase(fetchTracks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});


export const { setSelectedSong, selectAndPlaySong, setPlaybackState, setMobMenu } = tracksSlice.actions;
export default tracksSlice.reducer;