import express from "express";
import { getAllConnections, createConnection } from "../controllers/connectionController.js";

export const connectionRoutes = express.Router();

//get
connectionRoutes.get('/', getAllConnections);
//post

connectionRoutes.post('/', createConnection);

/**
 * @swagger
 * components:
 *  schemas:
 *    Connection:
 *      type: object
 *      required:
 *        - key
 *        - id
 *      properties:
 *        id: 
 *          type: int
 *          description: Clave unica, autoincremental.
 *        key: 
 *          type: string
 *          description: Cifrado para enlazar conexion.
 *      example: 
 *        id: 301
 *        key: 2R4MS9#$sDvLS
 *  
 */

/**
 * @swagger
 *  paths:
 *    /connect:
 *      get: 
 *        summary: Obtiene las claves cifradas
 *        description: Obtiene las listas de claves cifradas
 *        tags: 
 *          - Conections
 *        parameters:
 *          - in: query
 *            name: atributos
 *            required: false
 *            description: Se utiliza para filtrar las columnas de la tabla de conexiones
 *            schema:
 *              type: array
 *              items:
 *                type: string
 *              style: form
 *              examples:
 *                unAtributo:
 *                  summary: Ejemplo de un atributo solo
 *                  value: [nombre] # ?atributo=nombre
 *                multiplesAtributos:
 *                  summary: Ejemplo de multiples atributo solo
 *                  value: [nombre, apellido, edad] # ?atributo=nombre, apellido, edad
 *            allowEmptyValue: false
 *        response:
 *          '200':
 *            description: Claves Pbtenidas Con Exito
 *            content:  
 *              application/json:
 *              schema:
 *                type: json
 *                items: 
 *                  $ref: '#/components/schemas/Connection'
 *      post: 
 *        sumary: Crea una clave cifrada
 *        description: Crea una nueva clave cifrada
 *        tags: 
 *          - Conections
 *        requestBody: 
 *            content: 
 *              aplication/json:
 *                schema: 
 *                  type: object
 *                  properties:
 *                    id: 
 *                      type: integer
 *                    key:
 *                      type: string
 *        responses:
 *          '201': 
 *            description: Cifrado Creado Correctamente
 *          '400':
 *            description: Error en un cifrado        
 */