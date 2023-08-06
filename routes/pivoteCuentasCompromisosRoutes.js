import { getAllPivoteCuentasCompromisos, getPivotesCuentasById, updatePivoteCuentaById } from "../controllers/BI/pivoteCuentasCompromisosController.js";
import express from "express";

export const pivoteCuentasCompromisosRoutes = express.Router();

//get
pivoteCuentasCompromisosRoutes.get('/:key/', getAllPivoteCuentasCompromisos);
pivoteCuentasCompromisosRoutes.get('/:key/:id', getPivotesCuentasById);
//put
pivoteCuentasCompromisosRoutes.put('/:key/:id', updatePivoteCuentaById);
