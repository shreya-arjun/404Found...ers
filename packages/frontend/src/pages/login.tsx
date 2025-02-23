import ActionButton from "../components/actionButton";
import "../styling/login.scss";
import { SpotifyLoginService } from "../services/spotifyLoginService";
import { useEffect } from "react";

export default function Login() {
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      document.location = "home";
    }

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("code")) {
      SpotifyLoginService.getAccessToken(urlParams.get("code"));
    }
  }, []);

  return (
    <div className="loginContainer">
      <div className="loginForm">
        <h1 className="title">Tune/In</h1>
        <ActionButton
          action={() => {
            SpotifyLoginService.logUserIn();
          }}
          imagePath="/spotify_logo.png"
          text="Login With Spotify"
        />
      </div>
    </div>
  );
}
