import spotifyServices from "./spotifyServices.js";

/**
  * Gets recommended songs for a spotify user with the given parameters
  * @param  {JSON}    seed        Artist IDs and song parameters
  * @return {String}              Comma-separated list of Spotify track IDs
  */
async function getRecommendations(seed) {
  const url = "https://api.reccobeats.com/v1/track/recommendation?";
  const response = await fetch(url + new URLSearchParams({
    size: 5,
    ...seed,
  }), {
    headers: {
      "Accept": "application/json",
    },
  });

  const recommendations = await response.json();
  return recommendations.content.map((track) => track.href.substring(31));
}

/**
  * Gets track suggestions from ReccoBeats API
  * @param   {String}  accessToken Spotify user's API access token
  * @param   {JSON}    songParams  Target values for danceability, energy,
  *                                speechiness, and valence
  * @return  {Array<String>}       Comma-separated list of Spotify track IDs
  */
async function getSuggestions(accessToken, songParams) {
  // Get user's top tracks and add to seed
  const seed = {
    seeds: await spotifyServices.getTopTracks(accessToken, 5),
    ...songParams,
  }

  // Get track suggestions with updated seed
  const res = await getRecommendations(seed);
  return res;
}

export default {
  getSuggestions,
};