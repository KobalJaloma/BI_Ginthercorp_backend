import { getAllFacturas } from "../../controllers/denken/facturasController.js";
import express from 'express';

export const facturasRoutes = express.Router();

//get
facturasRoutes.get('/', getAllFacturas);
