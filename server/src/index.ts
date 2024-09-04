import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import bodyParser from "body-parser";
import "colors"; // Import the colors package and use its prototype methods

// Load environment variables from .env file
dotenv.config();

// REST OBJ
const app = express();
const port = process.env.PORT || 3000;

// Middleware setup
app.use(morgan("dev"));
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Example colored output
console.log("Starting server...".green);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`.yellow.bold);
});
