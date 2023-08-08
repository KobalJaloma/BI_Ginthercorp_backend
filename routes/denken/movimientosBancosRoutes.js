import { getAllMovimientosBancos } from "../../controllers/denken/movimientosBancosController.js";
import express from "express";

export const movimientosBancariosRoutes = express.Router();

//get
movimientosBancariosRoutes.get('/', getAllMovimientosBancos);