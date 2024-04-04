// spotifyToken.js
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;

async function getSpotifyToken() {
  try {
    const authOptions = {
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    };

    const response = await fetch(
      'https://accounts.spotify.com/api/token',
      authOptions
    );
    const data = await response.json();

    if (response.ok) {
      return data.access_token;
    } else {
      throw new Error('Failed to get Spotify token');
    }
  } catch (error) {
    console.error('Error getting Spotify token:', error.message);
    throw error;
  }
}

export default getSpotifyToken;
