import mongoose from "mongoose";

const SuggestionSchema = new mongoose.Schema({
  mood: {
    type: String,
    required: true,
  },
  track: {
    type: String,
    required: true,
  }, // Assuming track is a Spotify track ID
});

const UserSchema = new mongoose.Schema({
  spotifyId: {
    type: String,
    required: true,
    unique: true,
  },
  suggestions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Suggestion",
    },
  ],
});

const User = mongoose.model("User", UserSchema);
const Suggestion = mongoose.model("Suggestion", SuggestionSchema);

module.exports = { User, Suggestion };
