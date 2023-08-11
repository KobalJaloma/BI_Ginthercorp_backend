import { createBitacoraBancos, getAllBitacoraBancos } from "../controllers/BI/bitacoraBancosController.js";
import express from 'express';

export const bitacoraBancosRoutes = express.Router();

bitacoraBancosRoutes.get('/', getAllBitacoraBancos);
bitacoraBancosRoutes.post('/', createBitacoraBancos);