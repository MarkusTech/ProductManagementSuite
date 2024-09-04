import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import bodyParser from "body-parser";

// Load environment variables from .env file
dotenv.config();

// REST OBJ
const app = express();
const port = process.env.PORT || 5000;

// Middleware setup
app.use(morgan("dev")); // Logging
app.use(cors());
app.use(helmet());
app.use(bodyParser.json()); //
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
