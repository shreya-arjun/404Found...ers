import { useState } from "react";
import ActionButton from "../components/actionButton";
import "../styling/login.scss";
import { SpotifyLoginService } from "../services/spotifyLoginService";

export default function Login({
  setLoggedIn,
}: {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    console.log("logged in");
    const currentUser = SpotifyLoginService.logUserIn(username, password);
    localStorage.setItem("currentUser", `${currentUser}`);
  };

  return (
    <div className="loginContainer">
      <form className="loginForm">
        <h1 className="title">Tune/In</h1>
        <input
          type="text"
          className="loginInput"
          placeholder="Spotify Username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          type="text"
          className="loginInput"
          placeholder="Spotify Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <ActionButton
          action={setLoggedIn}
          imagePath="/spotify_logo.png"
          text="Login With Spotify"
        />
      </form>
    </div>
  );
}
