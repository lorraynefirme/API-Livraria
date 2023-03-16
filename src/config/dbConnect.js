import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config()

const connection = `mongodb+srv://${process.env.USERNAMEDB}:${process.env.PASSWORDDB}@livraria.lpojulu.mongodb.net/`

mongoose.connect(connection);

let db = mongoose.connection;

export default db;