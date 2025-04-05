import { fetchSpotifySongs } from '@utils/spotify';

let songs: { title: string; artist: string; url: string }[] = [];

export const initializeSongs = async () => {
  try {
    songs = await fetchSpotifySongs();
    console.log('Songs fetched successfully:', songs);
  } catch (error) {
    console.error('Error fetching songs:', error);
  }
};

export const getRandomSong = (): { title: string; artist: string; url: string } | null => {
  if (songs.length === 0) {
    console.warn('No songs available. Make sure to initialize the songs list.');
    return null;
  }

  const randomIndex = Math.floor(Math.random() * songs.length);
  return songs[randomIndex];
};
