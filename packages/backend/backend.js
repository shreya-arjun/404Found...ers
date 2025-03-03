import dotenv from "dotenv";
import generateSeed from "./services/generateSeed.js";
import mongoServices from "./services/mongoServices.js";
import suggestionServices from "./services/suggestionService.js";
import fileSystem from "./services/fileSystem.js";

dotenv.config();

const app = express();
const port = 8000;
app.use(cors());
app.use(express.json());

app.get("/new-suggestion", (req, res) => {
  const emotions =
    req.query.source.results.predictions.file.models.face.grouped_predictions.id
      .predictions.emotions;
  const seed = generateSeed(emotions);

  // Send seed to spotify API
  suggestionServices
    .getSuggestions(seed)
    .then((suggestion) => {
      return mongoServices.addSuggestion(suggestion).then(() => suggestion);
    })
    .then((suggestion) => res.send(suggestion));
});

// Get previous suggestions from DB
app.get("/suggestions/:id", (req, res) => {
  const id = req.params["id"];

  mongoServices.findSuggestions(id).then((result) => res.send(result));
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

// Upload image
app.post("/images", (req, res) => {
  const { id, image } = req.body;

  res.send(fileSystem.saveFile(image, id));
});

// get File from filesystem
app.get("/images/:id", (req, res) => {
  const { id } = req.body;

  res.send(fileSystem.getFile(id));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
