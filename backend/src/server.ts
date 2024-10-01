import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
import multer from "multer";
import compression from "compression";
import rateLimit from "express-rate-limit";
import "colors";
import passport from "passport";

// routes
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import categoryRoutes from "./routes/category.routes";
import supplierRoutes from "./routes/suppler.routes";
import locationRoutes from "./routes/location.routes";
import itemRoutes from "./routes/item.routes";
import inventoryRoutes from "./routes/inventory.routes";
import inventoryTypeRoutes from "./routes/inventoryType.routes";
import inventoryAdjustmentRoutes from "./routes/inventoryAdjustment.routes";
import adjustmentTypeRoutes from "./routes/adjustmentType.routes";
import adjustmentReasonRoutes from "./routes/adjustmentReason.routes";

// Initialize express app
const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  next();
});

// Rate Limiter - Limit repeated requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
});
app.use(limiter);

// Multer for file uploads
const upload = multer({ dest: "uploads/" });
app.post("/upload", upload.single("file"), (req: Request, res: Response) => {
  res.send("File uploaded successfully.");
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res
    .status(err.status || 500)
    .json({ error: err.message || "Internal Server Error" });
});

// Passport for authentication
app.use(passport.initialize());

// API
app.use("/api/v1", authRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", categoryRoutes);
app.use("/api/v1", supplierRoutes);
app.use("/api/v1", locationRoutes);
app.use("/api/v1", itemRoutes);
app.use("/api/v1", inventoryRoutes);
app.use("/api/v1", inventoryTypeRoutes);
app.use("/api/v1", inventoryAdjustmentRoutes);
app.use("/api/v1", adjustmentTypeRoutes);
app.use("/api/v1", adjustmentReasonRoutes);

// Error Handling Middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: err.message,
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`.yellow.bold);
});

export default app;
