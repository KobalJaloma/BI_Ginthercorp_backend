import { getAllUnidadesNegocio } from "../../controllers/denken/catUnidadesNegocioController.js";
import express from "express";

export const catUnidadesNegocioRoutes = express.Router();

//gets
catUnidadesNegocioRoutes.get('/', getAllUnidadesNegocio);