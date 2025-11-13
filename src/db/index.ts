import mongoose from 'mongoose';

const mongoUriCandidate = process.env.MONGO_URI;

if (!mongoUriCandidate) {
  throw new Error('MONGO_URI environment variable must be set before starting the server');
}

const mongoUri = mongoUriCandidate;

let connectionPromise: Promise<typeof mongoose> | null = null;

export async function connectDb(): Promise<typeof mongoose> {
  if (!connectionPromise) {
    connectionPromise = mongoose.connect(mongoUri).then((connection) => {
      console.log('Connected to MongoDB via Mongoose'); // eslint-disable-line no-console
      return connection;
    });
  }

  return connectionPromise;
}

export function getConnection(): mongoose.Connection {
  if (mongoose.connection.readyState === 0) {
    throw new Error('MongoDB connection has not been established. Call connectDb() first.');
  }

  return mongoose.connection;
}
