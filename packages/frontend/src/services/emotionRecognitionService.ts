import { HumeClient } from "hume";

class EmotionRecognitionService {
    // Receives images and sends to Hume for analysis
    public static async identifyEmotion(imageSrc: string): Promise<void> {
        try {
            // Used to poll job until complete
            const checkJobStatus = async (jobId: string) => {
                while (true) {                   
                    const waiting = await client.expressionMeasurement.batch.getJobDetails(response.jobId);
                    console.log("checked job");
                  
                    if (waiting.state.status === "COMPLETED") {
                        console.log("Job complete", waiting);
                        return waiting;
                    } else if(waiting.state.status === "IN_PROGRESS") {
                        console.log("Job still working", waiting);
                    } else if (waiting.state.status === "FAILED") {
                        console.error("Job failed.");
                        return;
                    }
                    
                    // Checks every 3 seconds
                    await new Promise(resolve => setTimeout(resolve, 3000));
                }
            };
            
            console.log("Processing image");
            
            const client = new HumeClient({ apiKey: "NyEnSqsDCJWluAYaBquATgHslcPB8Y0HC5T7mkfN0JiUp0SR" });
            console.log("Create client");

            // Send to Hume.ai
            const response = await client.expressionMeasurement.batch.startInferenceJob({
                urls: ["https://thumbs.dreamstime.com/b/winner-happy-woman-success-12804815.jpg"],
                notify: true
            });
            console.log(response);
            console.log(response.jobId);

            if(response) {
                console.log("working");
                await checkJobStatus(response.jobId);
                //const checking = await checkJobStatus(response.jobId);
                // if(checking) {
                //     const result = await client.expressionMeasurement.batch.getJobPredictions(response.jobId);
                //     console.log("Response: ", result.toString());
                // }
            } else {
                console.log("not working");
            }

            // Get response
            const result = await client.expressionMeasurement.batch.getJobPredictions(response.jobId);
            console.log("Response: ", result);

            // Send to backend
            
        } catch (error) {
            console.error("Error processing image", error);
        }
    }
}

export default EmotionRecognitionService;