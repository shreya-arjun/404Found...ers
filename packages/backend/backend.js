import dotenv from "dotenv";
<<<<<<< HEAD
import generateSeed from "./services/generateSeed.js";
import mongoServices from "./services/mongoServices.js";
import suggestionServices from "./services/suggestionService.js";
import getUserId from "./services/spotifyServices.js";
=======
import express from "express";
import cors from "cors";
import generateSeed from "./services/generateSeed.js"
import mongoServices from "./services/mongoServices.js"
import suggestionServices from "./services/suggestionService.js";
>>>>>>> origin/main

dotenv.config();

const app = express();
const port = 8000;
app.use(cors());
app.use(express.json());

<<<<<<< HEAD
app.get("/new-suggestion/:token", (req, res) => {
  const emotions =
    req.query.source.results.predictions.file.models.face.grouped_predictions.id
      .predictions.emotions;
  const id = getUserId(req.params["token"]);
=======
app.get("/new-suggestion", (req, res) => {
  const spotifyToken = req.query.spotify_token;
  const emotions =
    req.query.source.results.predictions.file.models.face.grouped_predictions.id
      .predictions.emotions;
>>>>>>> origin/main
  const seed = generateSeed(emotions);

  // Send seed to spotify API
  suggestionServices
<<<<<<< HEAD
    .getSuggestions(seed, emotions)
    .then((suggestion) => {
      return mongoServices.addSuggestion(suggestion, id).then(() => suggestion);
=======
    .getSuggestions(spotifyToken, seed)
    .then((suggestion) => {
      return mongoServices.addSuggestion(suggestion).then(() => suggestion);
>>>>>>> origin/main
    })
    .then((suggestion) => res.send(suggestion));
});

// Get previous suggestions from DB
app.get("/suggestions/:token", (req, res) => {
  const id = getUserId(req.params["token"]);

<<<<<<< HEAD
  mongoServices.findSuggestions(id).then((result) => res.send(result));
});

// Get user info from Spotify and send to frontend
app.get("/user/:token", (req, res) => {
  const id = getUserId(req.params["token"]);
=======
  mongoServices
    .findSuggestions(id)
    .then((result) => res.send(result));
});

// Get user info from Spotify and send to frontend
app.get("/user/:id", (req, res) => {
  const id = req.params["id"];
>>>>>>> origin/main

  // TODO: Request profile picture and username from spotify, send to frontend
});

// Delete user from DB
app.delete("/user/:token", (req, res) => {
  const id = getUserId(req.params["token"]);
  mongoServices
    // removeUser calls removeSuggestions in mongoServices so shouldn't have to worry about deleting suggestions here
    .removeUser(id)
    .then((_) => res.status(204).send(`Deleted user with id: ${id}`));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
