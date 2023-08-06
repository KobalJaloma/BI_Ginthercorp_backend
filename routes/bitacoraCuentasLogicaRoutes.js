import { createBitacoraCuentasLogica, getBitacoraCuentasLogica } from "../controllers/BI/bitacoraCuentasLogicaController.js";
import express from "express";

export const bitacoraCuentasLogicaRoutes = express.Router();

//gets
bitacoraCuentasLogicaRoutes.get('/:key/',getBitacoraCuentasLogica)
//post
bitacoraCuentasLogicaRoutes.post('/:key/',createBitacoraCuentasLogica)