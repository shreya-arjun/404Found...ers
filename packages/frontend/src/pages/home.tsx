import { useEffect, useState } from "react";
import "../styling/home.scss";
import { EmotionRecognitionService } from "../services/emotionRecognitionService";
import { UserDataService } from "../services/userDataService";
import { useNavigate } from "react-router-dom";

export default function Home() {

  const [newRequestButton, toggleNewRequestButton] = useState(false);
  const [previousUserSuggestions, setPreviousUserSuggestions] = useState([]);
  const [userAccountData, setUserAccountData] = useState([]);

  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/")
    }
    const fetchPreviousSuggestions = async () => {
      const previousSuggestions = await UserDataService.fetchPreviousSuggestions();
      setPreviousUserSuggestions(previousSuggestions);

    }

    const fetchUserAccountData = async () => {
      const userAccountData = await UserDataService.fetchUserAccountData();
    }
    //fetchPreviousSuggestions();
    //UserDataService.getUserName

    //mapper functions

  }, [])

  return (
    <div className="pageContainer">
      <section className="homePageSidebar">

        <div className="accountInfo">
          <img className="accountPFP" src="/default_user.png" alt="default pfp" />
          <h3 className="accountUsername">Spotify Username</h3>
        </div>

        <button className="sidebarButton"
        onClick={() => {
          localStorage.setItem("isLoggedIn", "false");
          console.log("false");
          navigate("/")
        }}
        >
          Logout
        </button>

        <button className="sidebarButton"
          onClick={() => {
            EmotionRecognitionService.identifyEmotion()
          }}>
          New Suggestion
        </button>

      </section>
      <section className="homePageBody">

        <div className="homePageTitle">
          <h1>Tune/In</h1>
        </div>

        <div className="suggestionContainer">

        </div>
      </section>
    </div>
  );
}
