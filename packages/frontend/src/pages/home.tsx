import { useState } from "react";
import "../styling/home.scss";

export default function Home({
  setLoggedIn,
}: {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [newRequestButton, toggleNewRequestButton] = useState(false);

  return (
    <div className="pageContainer">
      <section className="homePageSidebar">
        <div className="accountInfo">
          <img className="accountPFP" src="/default_user.png" alt="default pfp" />
          <h3 className="accountUsername">Spotify Username</h3>
        </div>
        <button className="sidebarButton"
          onClick={() => {
            setLoggedIn(false);
          }}>
          Logout
        </button>
        <button className="sidebarButton"
          onClick={() => {
            EmotionRecognitionService.identifyEmotions()
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
