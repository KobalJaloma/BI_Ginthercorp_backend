import { getAllPivotesCuentas, getPivotesCuentasById, updatePivoteCuentaById } from "../controllers/BI/pivoteCuentasPromesasController.js";
import express from "express";

export const pivoteCuentasPromesasRoutes = express.Router();

//gets
pivoteCuentasPromesasRoutes.get('/', getAllPivotesCuentas);
pivoteCuentasPromesasRoutes.get('/:id', getPivotesCuentasById);

//puts
pivoteCuentasPromesasRoutes.put('/:id', updatePivoteCuentaById);