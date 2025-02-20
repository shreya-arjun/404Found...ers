class EmotionRecognitionService {
    // Receives images and sends to Hume for analysis
    public static async identifyEmotion(imageSrc: string): Promise<void> {
        try {
            console.log("Processing image");

            // Send to Hume.ai

            // Get response & send to backend

        } catch (error) {
            console.error("Error processing image");
        }
    }
}

export default EmotionRecognitionService;
