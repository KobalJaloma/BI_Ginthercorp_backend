import { getAllCxc } from "../../controllers/denken/cxcController.js";
import express from "express";


export const cxcRoutes = express.Router();

cxcRoutes.get('/', getAllCxc);