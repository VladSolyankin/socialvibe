// main.js
import getSpotifyToken from './token.tsx';

const BASE_URL = 'https://api.spotify.com/v1';

async function getAllArtists(query) {
  try {
    const token = await getSpotifyToken();
    const response = await fetch(
      `${BASE_URL}/search?q=${query}&type=artist&limit=50`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data.artists;
  } catch (error) {
    console.error('Error getting artists:', error.message);
    throw error;
  }
}

async function getTracks(query) {
  try {
    const token = await getSpotifyToken();
    const response = await fetch(
      `${BASE_URL}/search?q=${query}&type=track&limit=5`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data.tracks;
  } catch (error) {
    console.error('Error getting tracks:', error.message);
    throw error;
  }
}

async function getSearchedTracks(query, offset) {
  try {
    const token = await getSpotifyToken();
    const response = await fetch(
      `${BASE_URL}/search?q=${query}&type=track&limit=10&offset=${offset}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data.tracks;
  } catch (error) {
    console.error('Error getting searched tracks:', error.message);
    throw error;
  }
}

async function getTracksByIds(ids) {
  try {
    const token = await getSpotifyToken();
    const response = await fetch(`${BASE_URL}/tracks?ids=${ids}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data.tracks;
  } catch (error) {
    console.error('Error getting tracks by IDs:', error.message);
    throw error;
  }
}
// TODO: type=track
async function getPlaylists(query) {
  try {
    const token = await getSpotifyToken();
    const response = await fetch(
      `${BASE_URL}/search?q=${query}&type=playlist&limit=50`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json().then(res => res.playlists);
    return data;
  } catch (error) {
    console.error('Error getting playlists:', error.message);
    throw error;
  }
}

async function getPlaylistTracks(playlistUrl) {
  try {
    const token = await getSpotifyToken();
    const response = await fetch(`${playlistUrl}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data.items;
  } catch (error) {
    console.error('Error getting playlist tracks:', error.message);
    throw error;
  }
}

async function getPopularTracks() {
  try {
    const token = await getSpotifyToken();
    const response = await fetch(
      `${BASE_URL}/search?q=${'eminem billie elish ariana grande justin bieber rap hip hop%20year=2024'}&type=track&`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting popular tracks:', error.message);
    throw error;
  }
}

export {
  getAllArtists,
  getTracks,
  getSearchedTracks,
  getTracksByIds,
  getPlaylists,
  getPlaylistTracks,
  getPopularTracks,
};
