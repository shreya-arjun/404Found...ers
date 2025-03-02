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
  const [url, setUrl] = useState<string | null>(null);
  const webcamRef = useRef<Webcam>(null);

  // Captures screenshots from webcam
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();

    if (imageSrc) {
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

  // USE useEffect TO RUN startWebcam
  useEffect(() => {
    if (isCaptureEnable) {
      startWebcam();
    }
  }, []);

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
