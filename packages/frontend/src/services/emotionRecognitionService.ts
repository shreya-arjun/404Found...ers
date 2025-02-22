import { HumeClient } from "hume";

class EmotionRecognitionService {
    // Receives images and sends to Hume for analysis
    public static async identifyEmotion(imageSrc: string): Promise<void> {
        try {
            console.log("Processing image");

            // Send to Hume.ai
            //const client = new HumeClient({ apiKey: "NyEnSqsDCJWluAYaBquATgHslcPB8Y0HC5T7mkfN0JiUp0SR" });
            /*await client.expressionMeasurement.batch.startInferenceJob({
                urls: [imageSrc],
                notify: true
            });*/

            // Get response
            // await client.expressionMeasurement.batch.getJobPredictions("job_id");
            

            // Send to backend
            
        } catch (error) {
            console.error("Error processing image");
        }
    }
}

export default EmotionRecognitionService;
