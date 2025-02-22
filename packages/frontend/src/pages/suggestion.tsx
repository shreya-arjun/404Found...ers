import { useState, useEffect,useRef, useCallback } from "react";
import emotionRecognitionService from "../services/emotionRecognitionService";
import Webcam from "react-webcam";


export default function Suggestion() {
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
}
