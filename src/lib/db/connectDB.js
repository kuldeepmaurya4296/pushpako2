import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

// Only throw error if not in build/test environment and URI is missing
if (!MONGODB_URI && process.env.NODE_ENV !== 'test' && !process.env.CI) {
  // Allow missing URI for scripts that will load it later
  console.warn("MONGODB_URI not found, ensure it's loaded before connecting");
}

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection;
  }

  const uri = process.env.MONGODB_URI || MONGODB_URI;
  if (!uri) {
    throw new Error("Please define MONGODB_URI in .env.local");
  }

  await mongoose.connect(uri, {
    // bufferCommands: true, // default is true
  });

  return mongoose.connection;
}
