import { createBitacoraCuentasPromesas, getBitacoraCuentasPromesas } from "../controllers/BI/bitacoraCuentasPromesaController";
import  express from "express";

export const bitacoraCuentasPromesaRoutes = express.Router();

//get
bitacoraCuentasPromesaRoutes.get('/', getBitacoraCuentasPromesas);
//post
bitacoraCuentasPromesaRoutes.post('/', createBitacoraCuentasPromesas);