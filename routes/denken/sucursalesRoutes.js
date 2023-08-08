import { getAllSucursales, getSucursalById } from "../../controllers/denken/sucursalesController.js";
import express from "express";

export const sucursalesRoutes = express.Router();

//get
sucursalesRoutes.get('/', getAllSucursales);
sucursalesRoutes.get('/:id', getSucursalById);