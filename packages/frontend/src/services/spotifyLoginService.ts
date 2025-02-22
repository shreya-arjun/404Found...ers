import express from "express";
import cors from "cors";
import { User } from "./User";

const clientId = "08d7a2df00bd4b64b86be0839bcf858a";
const redirectUri = "http://localhost:5173";
const scope = "user-top-read";
const authUrl = new URL("https://accounts.spotify.com/authorize");


export class SpotifyLoginService {
  public static async logUserIn(): number {
    // if an access token already exists, skip signup process.
    // if it has expired, it will be refreshed upon the first API request.
    if (localStorage.getItem("spotify_access_token") === null) {
      await SpotifyLoginService.signUserUp();
    }

    // begin the PKCE Flow
    localStorage.setItem("isLoggedIn", "true");
    console.log("true");
    return "logged in";
    // at the end, add user token and user name to local storage
    return 3;
  }

  public static async signUserUp() {
    const redirectUri = "http://localhost:5173";
    const scope = "user-top-read";
    const authUrl = new URL("https://accounts.spotify.com/authorize");

    // begin the PKCE Flow

    // generate a random authorization code
    const authVerifier = generateRandomStr(64);
    window.localStorage.setItem("spotify_auth_verifier", authVerifier);
    // generate an authorization challenge from the above code
    const authChallenge = base64encode(await sha256(authVerifier));

    // request authorization from Spotify
    const authParams = {
      response_type: "code",
      client_id: clientId,
      scope,
      code_challenge_method: "S256",
      code_challenge: authChallenge,
      redirect_uri: redirectUri,
    }

    // send authorization request
    authUrl.search = new URLSearchParams(params).toString();

    // send user to the Spotify authorization page
    window.location.href = authUrl.toString();
  }

  public static async getAccessToken(code: string): string {
    const authVerifier = localStorage.getItem("spotify_auth_verifier");

    const url = "https://accounts.spotify.com/api/token";
    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: clientId,
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
        code_verifier: authVerifier,
      }),
    }

    const body = await fetch(url, payload);
    const response = await body.json();

    localStorage.setItem("spotify_access_token", response.access_token);
  }

  public static async refreshAccessToken() {
    // TODO
  }

  private static generateRandomStr(length: number): string {
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ\
      abcdefghijklmnopqrstuvwxyz\
      0123456789_.-~";
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => {
      return acc + SpotifyLoginService
        .CODE_CHARSET[x % SpotifyLoginService.CODE_CHARSET.length], ""
    });
  }

  private static async sha256(plaintext: string): string {
    const encoder = new TextEncoder();
    const data = encoder.encode(plaintext);
    return window.crypto.subtle.digest("SHA-256", data);
  }
  
  private static base64encode(input: string): string {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
  }
}
