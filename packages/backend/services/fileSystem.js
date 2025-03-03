const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const IMAGES = process.env.IMAGES || "/tmp"; // Directory to store images

// Save the base64 image to the server
function saveFile(req, res) {
  const { image, id } = req.body; // Get the base64 image data, id, and filename from the request

  if (!image) {
    return res.status(400).send({ message: "No image data provided" });
  }

  // Remove the base64 data header (data:image/png;base64,...) if it's present
  const base64Data = image.replace(/^data:image\/\w+;base64,/, "");

  // Generate a unique filename or use the provided one
  const blobname = `${id || uuidv4()}:${"upload"}.png`; // Use the unique ID as part of the filename

  // Save the decoded base64 image to a file
  fs.writeFile(path.join(IMAGES, blobname), Buffer.from(base64Data, "base64"))
    .then(() => {
      res.status(201).send({
        url: `/images/${blobname}`, // Return the URL where the image can be accessed
      });
    })
    .catch((error) => {
      res.status(500).send({
        message: "Failed to upload file to server filesystem",
        error,
      });
    });
}

// Retrieve an image by its ID
function getFile(req, res) {
  const { id } = req.params;

  fs.readFile(path.join(IMAGES, id))
    .then((buf) => {
      res.send(buf); // Send the image as a response
    })
    .catch((error) => {
      res.status(404).send({
        message: `Not Found: ${id}`,
        error,
      });
    });
}

module.exports = { saveFile, getFile };


/*const fs = require("fs/promises");
const { Readable } = require("stream");
const { v4: uuidv4 } = require("uuid");

const IMAGES = process.env.IMAGES || "/tmp";

function saveFile(req, res) {
  const filename = req.query.filename || "upload";
  const uuid = uuidv4();
  const blobname = `${uuid}:${filename}`;
  const stream = Readable.from(req.body);

  fs.open(`${IMAGES}/${blobname}`, "w")
    .then((file) => fs.writeFile(file, stream))
    .then(() => {
      res.status(201).send({
        url: `/images/${blobname}`
      });
    })
    .catch((error) => {
      res.status(500).send({
        message: "failed to upload file to server filesystem",
        error
      });
    });
}

function getFile(req, res) {
  const { id } = req.params;

  fs.readFile(`${IMAGES}/${id}`)
    .then((buf) => {
      res.send(buf);
    })
    .catch((error) => {
      res.status(404).send({
        message: `Not Found: ${id}`,
        error
      });
    });
}

module.exports = { saveFile, getFile };
*/