import mongoose from "mongoose";

const TrackSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  album: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  coverImage: {
    type: String,
    default: "/default_cover.png",
  },
});

const SuggestionSchema = new mongoose.Schema({
  mood: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
    unique: true,
  },
  dateSuggested: {
    type: Date,
    required: true,
  },
  tracks: {
    type: [TrackSchema],
    required: true,
  },
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

export { User, Suggestion };
