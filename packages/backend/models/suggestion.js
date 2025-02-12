import mongoose from "mongoose";

const SuggestionSchema = new mongoose.Schema({
    user: {
        type: Number,
        required: true
    }
});

const suggestionModel = mongoose.model("Suggestion", SuggestionSchema);

export default suggestionModel;