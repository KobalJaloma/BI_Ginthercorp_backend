import express from "express";
import { createUsuario, getAllUsuarios, getUsuarioById } from "../controllers/usuariosController.js";

export const usuariosRoutes = express.Router();

//gets
usuariosRoutes.get('/', getAllUsuarios);
usuariosRoutes.get('/:id', getUsuarioById); //se le pasa el id

//post
usuariosRoutes.post('/', createUsuario);

/**
 * @swagger
 * paths:
 *  /usuarios:
 *      get:
 *          summary: Obtiene lista de los usuarios
 *          description: Obtiene la lista de todos los usuarios
 *          repsonses: 
 *              '200':
 *                  descripcion: Usuarios obtenidos con exito
 *                  content: 
 *                      application/json:
 *                          example: |
 *                              {
 *                                  "nombre": "Pedro"
 *                              }
 *      post: 
 *          summary: Crea un usuario
 *          description: Crea un nuevo usuario en el sistema
 *          requestBody:
 *              requiered: true
 *              content:
 *                  application/json:   
 *                      example: |
 *                      {
 *                          "nombre": "Pedro",
 *                      }
 *          responses: 
 *              '201': 
 *                  description: Usuario creado con exito
 *              '400':
 *                  description: Error en la solicitud
 */