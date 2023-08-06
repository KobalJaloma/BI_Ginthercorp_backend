import { createCuentas, getAllCuentas, getCuentasByid } from "../controllers/BI/catCuentasBancosController.js";
import express from "express";

export const catCuentasBancosRoutes = express.Router();

//get
catCuentasBancosRoutes.get('/:key/', getAllCuentas);
catCuentasBancosRoutes.get('/:key/:id', getCuentasByid);

//post
catCuentasBancosRoutes.post('/:key/', createCuentas);

/**
 * @swagger
 * components:
 *  schemas:
 *    CatCuentasBancos:
 *      type: object
 *      properties:
 *        id: 
 *          type: integer
 *          example: 100
 *        num_cuenta:
 *          type: string
 *          example: 1002321232145321
 *        banco:
 *          type: string
 *          example: SANTANDER
 *        fk_unidad_negocio:
 *          type: integer
 *          example: 130
 *        razon_social:
 *          type: string
 *          example: Pepsico Iberia Servicios Centrales, S.L.
 *      required: 
 *        -id
 *        -num_cuenta
 *      example:
 *        id: 100
 *        num_cuenta: 1002321232145321
 *        banco: SANTANER
 *        fk_unidad_negocio: 12
 *        razon_social: Pepsico Iberia Servicios Centrales, S.L.
 */


