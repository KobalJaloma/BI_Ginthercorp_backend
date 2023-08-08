import { getAllPivoteCuentasCompromisos, getPivotesCuentasById, updatePivoteCuentaById } from "../controllers/BI/pivoteCuentasCompromisosController.js";
import express from "express";

export const pivoteCuentasCompromisosRoutes = express.Router();

//get
pivoteCuentasCompromisosRoutes.get('/', getAllPivoteCuentasCompromisos);
pivoteCuentasCompromisosRoutes.get('/:id', getPivotesCuentasById);
//put
pivoteCuentasCompromisosRoutes.put('/:id', updatePivoteCuentaById);
