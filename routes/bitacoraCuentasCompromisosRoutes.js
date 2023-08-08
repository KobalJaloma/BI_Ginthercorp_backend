import { createBitacoraCuentaCompromisos, getAllBitacoraCuentasCompromisos } from "../controllers/BI/bitacoraCuentasCompromisosController.js";
import express from "express";

export const bitacoraCuentasCompromisosRoutes = express.Router();

//gets
bitacoraCuentasCompromisosRoutes.get('/', getAllBitacoraCuentasCompromisos);

//post
bitacoraCuentasCompromisosRoutes.post('/', createBitacoraCuentaCompromisos);