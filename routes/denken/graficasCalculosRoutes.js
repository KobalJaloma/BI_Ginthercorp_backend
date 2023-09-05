import { 
  balanceIngEgr, egresos, ingresosCXC, facCanceladas, 
  familiaGastos, facturasExpedidas, detalladoMovimientos
} from "../../controllers/denken/calculos/graficasCalculosController.js";
import express from "express";

export const graficaCalculosRoutes = express.Router();

//facturas
graficaCalculosRoutes.get('/ingresos_cxc', ingresosCXC);
graficaCalculosRoutes.get('/facturas_expedidas', facturasExpedidas)
graficaCalculosRoutes.get('/facturas_canceladas', facCanceladas);

//balances
graficaCalculosRoutes.get('/balances', balanceIngEgr);

//egresos
graficaCalculosRoutes.get('/egresos', egresos);
graficaCalculosRoutes.get('/familias_gastos', familiaGastos);

//listas
graficaCalculosRoutes.get('/detallado_movimientos', detalladoMovimientos);
