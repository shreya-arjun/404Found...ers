import { HumeClient } from "hume";

class EmotionRecognitionService {
    // Receives images and sends to Hume for analysis
    public static async identifyEmotion(imageSrc: string): Promise<void> {
        try {
            console.log("Processing image");
            
            const client = new HumeClient({ apiKey: "NyEnSqsDCJWluAYaBquATgHslcPB8Y0HC5T7mkfN0JiUp0SR" });
            console.log("Create client");

            // Send to Hume.ai
            const response = await client.expressionMeasurement.batch.startInferenceJob({
                urls: [imageSrc],
                notify: true
            });

            console.log(response.jobId);

            // ISSUES:
            //      RUNS TWO JOBS???
            //      STOPS WORKING HERE
            //      I don't think the image is being sent correctly

            // Get response
            const result = await client.expressionMeasurement.batch.getJobPredictions(response.jobId.toString());
            console.log("Response: ", result);

            // Send to backend
            
        } catch (error) {
            console.error("Error processing image");
        }
    }
}

export default EmotionRecognitionService;