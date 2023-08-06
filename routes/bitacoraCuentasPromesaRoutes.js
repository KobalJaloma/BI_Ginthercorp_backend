import { createBitacoraCuentasPromesas, getBitacoraCuentasPromesas } from "../controllers/BI/bitacoraCuentasPromesaController";
import  express from "express";

export const bitacoraCuentasPromesaRoutes = express.Router();

//get
bitacoraCuentasPromesaRoutes.get('/:key/', getBitacoraCuentasPromesas);
//post
bitacoraCuentasPromesaRoutes.post('/:key/', createBitacoraCuentasPromesas);