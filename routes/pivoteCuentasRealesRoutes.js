import { getAllPivotesCuentas, getPivotesCuentasById, updatePivoteCuentaById } from "../controllers/BI/pivoteCuentasRealesController.js";
import express from "express";

export const pivoteCuentasRealesRoutes = express.Router();


//get
pivoteCuentasRealesRoutes.get('/:key/', getAllPivotesCuentas);
pivoteCuentasRealesRoutes.get('/:key/:id', getPivotesCuentasById);

//put
pivoteCuentasRealesRoutes.put('/:key/:id', updatePivoteCuentaById);