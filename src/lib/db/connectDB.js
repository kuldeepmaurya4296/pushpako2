import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

// Only throw error if not in build/test environment and URI is missing
if (!MONGODB_URI && process.env.NODE_ENV !== 'test' && !process.env.CI) {
  // Allow missing URI for scripts that will load it later
  console.warn("MONGODB_URI not found, ensure it's loaded before connecting");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  const uri = process.env.MONGODB_URI || MONGODB_URI;
  if (!uri) {
    throw new Error("Please define MONGODB_URI in .env.local");
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
