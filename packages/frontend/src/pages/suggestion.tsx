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
  const capture = useCallback(() => {
    console.log("start capture");
    if (screenshotCaptured)
      return;

    const imageSrc = webcamRef.current?.getScreenshot();
    
    if (imageSrc) {
      // setUrl(imageSrc);
      emotionRecognitionService.identifyEmotion(imageSrc); // Sends image --> sent to Hume.ai
      setScreenshotCaptured(true);
    }
  }, [webcamRef, screenshotCaptured]);

  // Starts webcam for 3 seconds
  const startWebcam = () => {
    console.log("start webcam");

    setTimeout(() => {
      console.log("create capture");
      capture();
    }, 1500);

    setTimeout(() => {
      setCaptureEnable(false);
    }, 3000);
  };

  // Use useEffect to run startWebcam()
  //useEffect(() => {
    if(isCaptureEnable) {
      startWebcam();
    }
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