import express from "express";
import cors from "cors";

/**
 * Gets the Spotify user ID of a user
 * @param {String} accessToken
 */
async function getUserId(accessToken) {
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
 * @param {String} accessToken
 */
async function getTopArtists(accessToken) {
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

  const userData = await response.json();

  if (userData.error) {
    return -1;
  }
  return userData.items;
}
