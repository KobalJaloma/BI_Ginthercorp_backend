import express from "express";
import { getAllConnections } from "../controllers/connectionController.js";

export const connectionRoutes = express.Router();

//get
connectionRoutes.get('/', getAllConnections);
//post