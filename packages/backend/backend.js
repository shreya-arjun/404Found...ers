import dotenv from "dotenv";
import generateSeed from "./services/generateSeed.js"
import services from "./services/suggestionService.js"

dotenv.config();

const app = express();
const port = 8000;
app.use(cors());
app.use(express.json());


app.get("/something", (req, res) => {
    // This is assuming req.query contains entire JSON from Hume.ai job prediction
    const emotions = req.query.source.results.predictions.file.models.face.grouped_predictions.id.predictions.emotions;
    const seed = generateSeed(emotions);
    // Send seed to spotify API 
    // TODO: save suggestion to Mongo
    services 
    .getSuggestions(seed)
    .then((suggestions) => res.send(suggestions));
});


app.listen(port, () => {
    console.log(
      `Example app listening at http://localhost:${port}`
    );
  });