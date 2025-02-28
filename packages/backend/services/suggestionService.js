import spotifyServices from "./services/spotifyServices.js";

/**
  * Gets track suggestions from Spotify Web API
  * @param   {String}  accessToken Spotify user's API access token
  * @param   {JSON}  songParams  Target values for danceability, energy,
  *                              speechiness, and valence
  * @return  {String}            Comma-separated list of Spotify track IDs
  */
function getSuggestions(accessToken, songParams) {
  // Get user's top artists and add to seed with key seed_artists
  const seed = {
    seed_artists: spotifyServices.getTopArtists(accessToken, 5);
    ...songParams,
  }

  // Get track suggestions with updated seed
  return getRecommendations(accessToken, params);
}

export default {
  getSuggestions
}
