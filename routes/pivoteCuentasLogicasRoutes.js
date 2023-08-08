import { getAllPivotesCuentas, getPivotesCuentasById, updatePivoteCuentaById } from "../controllers/BI/pivoteCuentasLogicasController.js";
import express from "express";

export const  pivoteCuentasLogicasRoutesRoutes = express.Router();

//gets
pivoteCuentasLogicasRoutesRoutes.get('/', getAllPivotesCuentas);
pivoteCuentasLogicasRoutesRoutes.get('/:id', getPivotesCuentasById);

//puts
 pivoteCuentasLogicasRoutesRoutes.put('/:id', updatePivoteCuentaById);