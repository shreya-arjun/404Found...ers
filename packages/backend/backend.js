import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import generateSeed from "./services/generateSeed.js"
import mongoServices from "./services/mongoServices.js"
import suggestionServices from "./services/suggestionService.js";
import mongoose from "mongoose";

dotenv.config();

const { MONGO_CONNECTION_STRING } = process.env;

mongoose.set("debug", true);
mongoose
  .connect(MONGO_CONNECTION_STRING + "users") // connect to Db "users"
  .catch((error) => console.log(error));

const app = express();
const port = 8000;
app.use(cors());
app.use(express.json());

app.get("/new-suggestion", (req, res) => {
  const spotifyToken = req.query.spotify_token;
  const emotions =
    req.query.source.results.predictions.file.models.face.grouped_predictions.id
      .predictions.emotions;
  const seed = generateSeed(emotions);

  // Send seed to spotify API
  suggestionServices
    .getSuggestions(spotifyToken, seed)
    .then((suggestion) => {
      return mongoServices.addSuggestion(suggestion).then(() => suggestion);
    })
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
