import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import generateSeed from "./services/generateSeed.js"
import mongoServices from "./services/mongoServices.js"
import suggestionServices from "./services/suggestionService.js";

dotenv.config();

const app = express();
const port = 8000;
app.use(cors());
app.use(express.json());

app.get("/new-suggestion", (req, res) => {
  const spotifyToken = req.query.spotify_token;
  //const emotions = req.query.source.results.predictions.file.models.face.grouped_predictions.id.predictions.emotions;
  const emotions = [
      {'name': 'Anger', 'score': 0.1},
      {'name': 'Anxiety', 'score': 0.2},
      {'name': 'Boredom', 'score': 0.6},
      {'name': 'Calmness', 'score': 0.4},
      {'name': 'Concentration', 'score': 0.1},
      {'name': 'Joy', 'score': 0.3},
      {'name': 'Romance', 'score': 0.1},
      {'name': 'Excitement', 'score': 0.2}
    ]; // TODO remove
  const seed = generateSeed(emotions);

  // Send seed to spotify API
  suggestionServices
    .getSuggestions(spotifyToken, seed)
    .then((suggestion) => {
      console.log(suggestion);
      return suggestion;
    })
    //.then((suggestion) => {
    //  return mongoServices.addSuggestion(suggestion)
    //    .then(() => suggestion);
    //})
    .then((suggestion) => res.send(suggestion));
});

// Get previous suggestions from DB
app.get("/suggestions/:id", (req, res) => {
  const id = req.params["id"];

  mongoServices
    .findSuggestions(id)
    .then((result) => res.send(result));
});

// Get user info from Spotify and send to frontend
app.get("/user/:id", (req, res) => {
  const id = req.params["id"];
  
  // TODO: Request profile picture and username from spotify, send to frontend

});

// Delete user from DB
app.delete("/user/:id", (req, res) => {
  const id = req.params["id"];
  mongoServices
  // removeUser calls removeSuggestions in mongoServices so shouldn't have to worry about deleting suggestions here
    .removeUser(id)
    .then((_) => res.status(204).send(`Deleted user with id: ${id}`));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
