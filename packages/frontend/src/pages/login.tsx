import ActionButton from "../components/actionButton";
import "../styling/login.scss";
import { SpotifyLoginService } from "../services/spotifyLoginService";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="loginContainer">
      <div className="loginForm">
        <h1 className="title">Tune/In</h1>
        <ActionButton
          action={() => {
            SpotifyLoginService.logUserIn().then((result) => {
              navigate("/home");
            });
          }}
          imagePath="/spotify_logo.png"
          text="Login With Spotify"
        />
      </div>
    </div>
  );
}
