import { balanceIngEgr } from "../../controllers/denken/calculos/graficasCalculosController.js";
import express from "express";

export const graficaCalculosRoutes = express.Router();

//get
graficaCalculosRoutes.get('/balance', balanceIngEgr);

//post
