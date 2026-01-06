import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI as string;

if (!uri) {
  throw new Error("Please add MONGODB_URI to .env.local");
}

let client: MongoClient;
let db: Db;

export async function connectDB() {
  if (db) return db;

  client = new MongoClient(uri);
  await client.connect();
  db = client.db(process.env.MONGODB_DB || "dev_tracker");

  return db;
}
