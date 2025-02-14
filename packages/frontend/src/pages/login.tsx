import ActionButton from "../components/actionButton";
import "../styling/login.scss";
import { SpotifyLoginService } from "../services/spotifyLoginService";

export default function Login({
  setLoggedIn,
}: {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}) {

  return (
    <div className="loginContainer">
      <div className="loginForm">
        <h1 className="title">Tune/In</h1>
        <ActionButton
          action={() => {
            SpotifyLoginService.logUserIn().then((result) => {
              console.log(result);
              setLoggedIn(true)
            })
          }}
          imagePath="/spotify_logo.png"
          text="Login With Spotify"
        />
      </div>
    </div>
  );
}
