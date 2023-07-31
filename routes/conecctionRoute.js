import express from "express";
import { getAllConnections, createConnection } from "../controllers/connectionController.js";

export const connectionRoutes = express.Router();

//get
connectionRoutes.get('/', getAllConnections);
//post

connectionRoutes.post('/', createConnection);