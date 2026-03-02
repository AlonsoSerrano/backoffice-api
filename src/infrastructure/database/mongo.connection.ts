import mongoose from "mongoose";
import { env } from "../config/env";

export const connectMongo = async () => {
  try {
    await mongoose.connect(env.mongoUri);

    console.log("Conexion Mongo correcta");
  } catch (error) {
    console.error("Error de conexion Mongo", error);
    process.exit(1);
  }
};