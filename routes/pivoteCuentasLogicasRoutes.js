import { getAllPivotesCuentas, getPivotesCuentasById, updatePivoteCuentaById } from "../controllers/BI/pivoteCuentasLogicasController.js";
import express from "express";

export const  pivoteCuentasLogicasRoutesRoutes = express.Router();

//gets
pivoteCuentasLogicasRoutesRoutes.get('/:key/', getAllPivotesCuentas);
pivoteCuentasLogicasRoutesRoutes.get('/:key/:key', getPivotesCuentasById);

//puts
 pivoteCuentasLogicasRoutesRoutes.put('/:key/:id', updatePivoteCuentaById);