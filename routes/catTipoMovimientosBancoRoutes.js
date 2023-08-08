import express from "express";
import { createCuentas, getAllCuentas, getCuentasByid } from "../controllers/BI/catCuentasBancosController.js";

export const catTipoMovimientosRoutes = express.Router();

//get
catTipoMovimientosRoutes.get('/', getAllCuentas);
catTipoMovimientosRoutes.get('/:id', getCuentasByid);

//post
catTipoMovimientosRoutes.post('/', createCuentas);

