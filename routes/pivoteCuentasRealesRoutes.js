import { getAllPivotesCuentas, getPivotesCuentasById, updatePivoteCuentaById } from "../controllers/BI/pivoteCuentasRealesController.js";
import express from "express";

export const pivoteCuentasRealesRoutes = express.Router();


//get
pivoteCuentasRealesRoutes.get('/', getAllPivotesCuentas);
pivoteCuentasRealesRoutes.get('/:id', getPivotesCuentasById);

//put
pivoteCuentasRealesRoutes.put('/:id', updatePivoteCuentaById);