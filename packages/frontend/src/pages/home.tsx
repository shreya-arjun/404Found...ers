import { useEffect, useState } from "react";
import "../styling/home.scss";
import { EmotionRecognitionService } from "../services/emotionRecognitionService";
import { UserDataService } from "../services/userDataService";
import { useNavigate } from "react-router-dom";
import Suggestion from "../components/suggestion";
import Track from "../components/track";
import { ComponentMapper } from "../services/componentMapper";

export default function Home() {
  const [newRequestButton, toggleNewRequestButton] = useState(false);
  const [previousUserSuggestions, setPreviousUserSuggestions] = useState([]);
  const [userAccountData, setUserAccountData] = useState([]);

  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
    const fetchPreviousSuggestions = async () => {
      const previousSuggestions =
        await UserDataService.fetchPreviousSuggestions();
      const suggestionComponents = ComponentMapper.mapSuggestions(previousSuggestions);
      //setPreviousUserSuggestions(suggestionComponents);
    };

    const fetchUserAccountData = async () => {
      const userAccountData = await UserDataService.fetchUserAccountData();
    };
    //fetchPreviousSuggestions();
    //UserDataService.getUserName

    //mapper functions
  }, []);

  return (
    <div className="pageContainer">
      <section className="homePageSidebar">
        <div className="accountInfo" onClick={() => {
          navigate("/account");
        }}>
          <img
            className="accountPFP"
            src="/default_user.png"
            alt="default pfp"
          />
          <h3 className="accountUsername">Spotify Username</h3>
        </div>

        <button
          className="sidebarButton"
          onClick={() => {
            localStorage.setItem("isLoggedIn", "false");
            console.log("false");
            navigate("/");
          }}>
          Logout
        </button>

        <button
          className="sidebarButton"
          onClick={() => {
            navigate("/suggestion");
          }}>
          New Suggestion
        </button>
      </section>
      <section className="homePageBody">
        <div className="homePageTitleContainer">
          <h1 className="title">Tune/In</h1>
        </div>

        <div className="suggestionContainer">
          <Suggestion suggestionId="id" suggestionName="#" dateSuggested="MM/DD/YYYY" basedOn={"Emotion"} tracks={[]}/>
          <div className="space"></div>
          <Suggestion suggestionId="id" suggestionName="1" dateSuggested="2/19/2025" basedOn={"Happiness"} tracks={[]}/>
          <Suggestion suggestionId="id" suggestionName="2" dateSuggested="2/18/2025" basedOn={"Boredom"} tracks={[]}/>
          <Suggestion suggestionId="id" suggestionName="3" dateSuggested="2/17/2025" basedOn={"Energetic"} tracks={[]}/>

        </div>
      </section>
    </div>
  );
}
