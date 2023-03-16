import mongoose from "mongoose";

mongoose.connect("mongodb+srv://livrarianode:123@livraria.lpojulu.mongodb.net/");

let db = mongoose.connection;

export default db;