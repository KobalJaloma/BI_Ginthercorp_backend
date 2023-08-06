import { getAllPivotesCuentas, getPivotesCuentasById, updatePivoteCuentaById } from "../controllers/BI/pivoteCuentasPromesasController.js";
import express from "express";

export const pivoteCuentasPromesasRoutes = express.Router();

//gets
pivoteCuentasPromesasRoutes.get('/:key/', getAllPivotesCuentas);
pivoteCuentasPromesasRoutes.get('/:key/:id', getPivotesCuentasById);

//puts
pivoteCuentasPromesasRoutes.put('/:key/:id', updatePivoteCuentaById);