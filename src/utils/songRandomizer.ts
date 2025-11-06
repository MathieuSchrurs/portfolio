import { fetchSpotifySongs } from '@utils/spotify';
import { getRandomElement } from './arrayUtils';

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

  return getRandomElement(songs);
};
