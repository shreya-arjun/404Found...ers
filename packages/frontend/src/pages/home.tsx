import { useState, useRef, useCallback } from "react";
import "../styling/home.scss";
import Webcam from "react-webcam";
import emotionRecognitionService from "../services/emotionRecognitionService";

// Set video constraints
const videoConstraints = {
  width: 720,
  height: 360,
  facingMode: "user",
};

export default function Home({
  setLoggedIn,
}: {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [newRequestButton, toggleNewRequestButton] = useState(false);
  
  const [isCaptureEnable, setCaptureEnable] = useState(false); 
  const [url, setUrl] = useState<string | null>(null);
  const webcamRef = useRef<Webcam>(null);

  // Captures screenshots from webcam
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();

    if(imageSrc) {
      setUrl(imageSrc);
      emotionRecognitionService.identifyEmotion(imageSrc); // Sends image --> sent to Hume.ai
    }
  }, [webcamRef]);

  // Starts webcam for 3 seconds
  const startWebcam = () => {
    setCaptureEnable(true);

    setTimeout(() => {
      setCaptureEnable(false);
      capture();
    }, 3000);
  };

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
            startWebcam(); // Call startWebcam() when "New Suggestion" is pressed
          }}>
          New Suggestion
        </button>
      </section>

      <section className="homePageBody">
        <div className="homePageTitle">
          <h1>Tune/In</h1>
        </div>
        <div className="suggestionContainer">
          {isCaptureEnable && (
            <div>
              <Webcam
                audio={false}
                width={720}
                height={360}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                style={{ transform: "scaleX(-1)" }}
              />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
