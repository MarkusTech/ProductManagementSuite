import mongoose, { Schema, Document, Model } from "mongoose";

// Define the interface for the Token document
interface IToken extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  token: string;
  createdAt: Date;
  expiresAt: Date;
}

// Create the schema for Token
const tokenSchema = new Schema<IToken>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

// Create and export the model
const Token: Model<IToken> = mongoose.model<IToken>("Token", tokenSchema);

export default Token;
