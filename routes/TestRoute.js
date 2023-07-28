import { createTest, getAllTests } from "../controllers/testController.js";
import express from "express";

export const TestRoute = express.Router();

//Gets
TestRoute.get('/', getAllTests);

//Posts
TestRoute.post('/', createTest);


/**
 * @swagger
 * components:
 *  schemas:
 *   Test:
 *      type: object
 *      required:
 *          -id
 *          -connection_key
 *      properties:
 *          id:
 *              type: int
 *              description: Autogenerado por cada registro
 *          nombre:
 *              type: string
 *              description: Nombre de la persona
 *          apellido: 
 *              type: string
 *              description: Apellido de la persona
 *          usuario: 
 *              type: string
 *              description: Nombre de usuario para iniciar sesion
 *          password: 
 *              type: string
 *              description: Contraseña cifrada
 *          connection_key:
 *              type: string
 *              description: Cifrado de conexion al backend
 *          last_update: 
 *              type: date
 *              description: Fecha de ultimo update del usuario
 *      example:
 *          id: 1
 *          nombre: Leonardo
 *          apellido: jaloma
 *          usuario: leonardo.jaloma
 *          password: h12smkm#4dsak
 *          connection_key: LsDGsdn83#%saDJLb
 *          last_update: 2023-06-20T04:05:06.157Z
 * paths:
 *  /test
 *      get:
 *          summary: Returns all tests
 *      required: true
 *      content:
 *      application/json:
 *          schema:
 *               $ref: '#/components/schemas/Test'
 *          responses:
 *              '201': 
 *                   description: Todos Obtenidos 
 */
