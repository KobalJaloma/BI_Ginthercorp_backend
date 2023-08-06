import express from "express";
import { createCuentas, getAllCuentas, getCuentasByid } from "../controllers/BI/catCuentasBancosController.js";

export const catTipoMovimientosRoutes = express.Router();

//get
catTipoMovimientosRoutes.get('/:key/', getAllCuentas);
catTipoMovimientosRoutes.get('/:key/:id', getCuentasByid);

//post
catTipoMovimientosRoutes.post('/:key/', createCuentas);

