import express from "express";
import cors from "cors";

/**
 * Gets the Spotify user ID of a user
 * @param   {String}  accessToken Spotify user's API access token
 */
function getUserId(accessToken) {
  const url = "https://api.spotify.com/v1/me";

  const response = await fetch(url, {
    headers: {
      "Authorization": "Bearer " + accessToken
    },
  });

  const userData = await response.json();

  if (userData.error) {
    return -1;
  }
  return userData.id;
}

/**
 * Gets the top n artists of a Spotify user
 * @param   {String}  accessToken Spotify user's API access token
 * @param   {Number}  count       The maximum number of returned artists
 * @return  {String}              Comma-separated list of Spotify artist IDs
 */
function getTopArtists(accessToken, count) {
  const url = "https://api.spotify.com/v1/me/top/artists";

  const response = await fetch(url, {
    headers: {
      "Authorization": "Bearer " + accessToken
    },
    body: new URLSearchParams({
      type: "artists",
      time_range: "medium_term",
      limit: count,
    }),
  });

  const responseData = await response.json();

  if (responseData.error) {
    return -1;
  }

  return responseData.items.map((item) => item.id).toString();
}

/**
  * Gets recommended songs for a spotify user with the given parameters
  * @param  {String}  accessToken Spotify user's API access token
  * @param  {JSON}    seed        Artist IDs and song parameters
  * @return {String}              Comma-separated list of Spotify track IDs
  */
function getRecommendations(accessToken, seed) {
  const url = "https://api.spotify.com/v1/recommendations";

  const response = await fetch(url, {
    headers: {
      "Authorization": "Bearer " + accessToken
    },
    body: new URLSearchParams(seed),
  });

  const recommendations = await response.json();
  if (recommendations.error) {
    return -1;
  }
  return recommendations.tracks;
}

export default {
  getUserId, getRecommendations, getTopArtists
}
