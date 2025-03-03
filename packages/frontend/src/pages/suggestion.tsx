import { useState, useEffect, useRef, useCallback } from "react";
import emotionRecognitionService from "../services/emotionRecognitionService";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 720,
  height: 360,
  facingMode: "user",
};

export default function Suggestion() {
  const [isCaptureEnable, setCaptureEnable] = useState(true);
  // const [url, setUrl] = useState<string | null>(null);
  const webcamRef = useRef<Webcam>(null);
  const [screenshotCaptured, setScreenshotCaptured] = useState(false);

  // Captures screenshots from webcam
  const capture = useCallback(async () => {
    console.log("start capture");
<<<<<<< HEAD
    if (screenshotCaptured) return;
=======
    if (screenshotCaptured)
      return;
>>>>>>> refs/remotes/origin/ella-emotion

    // Captures screenshot
    const imageSrc = webcamRef.current?.getScreenshot();
    
    // TO-DO:
    // Convert image to public url

    if (imageSrc) {
<<<<<<< HEAD
      // setUrl(imageSrc);
=======
      setUrl(imageSrc);
>>>>>>> refs/remotes/origin/ella-emotion
      console.log(imageSrc);

      // Using online image with public URL for now to test API
      emotionRecognitionService.identifyEmotion("https://thumbs.dreamstime.com/b/winner-happy-woman-success-12804815.jpg")

      //emotionRecognitionService.identifyEmotion(imageSrc);
      setScreenshotCaptured(true);
    }
  }, [webcamRef, screenshotCaptured]);

  // Starts webcam for 3 seconds
  const startWebcam = () => {
    console.log("start webcam");

    // Captures image 1.5 seconds into webcam being open
    setTimeout(() => {
      console.log("create capture");
      capture();
    }, 1500);

    // Turns camera off after 3 seconds
    setTimeout(() => {
      setCaptureEnable(false);
    }, 3000);
  };

  // Use useEffect to run startWebcam()...???
  //useEffect(() => {
<<<<<<< HEAD
  if (isCaptureEnable) {
    startWebcam();
  }
=======
    if(isCaptureEnable) {
      startWebcam();
    }
>>>>>>> refs/remotes/origin/ella-emotion
  //}, []);

  return (
    <div className="webcam">
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
  );
}