import { registerAs } from "@nestjs/config";

export default registerAs('database', () => ({
  uri: process.env.MONGODB_URI || 'mongodb://127.0.0.1/05-db-02-mongodb'
}))