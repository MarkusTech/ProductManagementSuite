import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import bodyParser from "body-parser";
import "colors";
import connectDB from "./database/connect";
import errorHandler from "./middleware/errorsMiddleware";

// Load environment variables from .env file
dotenv.config();

// REST OBJ
const app = express();
const port = process.env.PORT || 5000;

// Middleware setup
app.use(morgan("dev"));
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// CORS middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  next();
});

// Route handlers
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/category", require("./routes/categoryRoutes"));
app.use("/api/product", require("./routes/productRoutes"));
app.use("/api/upload", require("./utils/uploadImage"));

app.use(errorHandler);
connectDB();

console.log("Starting server...".green);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`.yellow.bold);
});
