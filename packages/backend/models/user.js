import mongoose from "mongoose";

const SuggestionSchema = new mongoose.Schema({
    mood: {
        type: String, 
        required: true 
    },
    track: {  // Assuming track is a Spotify track ID
        type: String, 
        required: true 
    },
    user: {  
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', // ref to the User model
        required: true
    }
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
