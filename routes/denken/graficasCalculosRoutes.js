import { balanceIngEgr, egresosUnidad, ingresosCXC, facCanceladas, familiaGastos} from "../../controllers/denken/calculos/graficasCalculosController.js";
import express from "express";

export const graficaCalculosRoutes = express.Router();

//get
graficaCalculosRoutes.get('/balance', balanceIngEgr);
graficaCalculosRoutes.get('/ingresoscxc', ingresosCXC);
graficaCalculosRoutes.get('/egresos/:unidad', egresosUnidad);
graficaCalculosRoutes.get('/faccanceladas', facCanceladas);
graficaCalculosRoutes.get('/familiagastos/:unidad', familiaGastos);
