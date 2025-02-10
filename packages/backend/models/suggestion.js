import mongoose from "mongoose";

const SuggestionSchema = new mongoose.Schema({});

const suggestionModel = mongoose.model("Suggestion", SuggestionSchema);

export default suggestionModel;