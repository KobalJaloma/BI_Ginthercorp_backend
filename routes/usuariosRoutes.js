import express from "express";
import { createUsuario, getAllUsuarios, getUsuarioById, autenticarUsuario } from "../controllers/BI/usuariosController.js";

export const usuariosRoutes = express.Router();

//gets
usuariosRoutes.get('/', getAllUsuarios);
usuariosRoutes.get('/:id', getUsuarioById); //se le pasa el id

//post
usuariosRoutes.post('/', createUsuario);
usuariosRoutes.post('/auth', autenticarUsuario);





//SWAGGER CONFIG
/**
 * @swagger
 * components:
 *  schemas:
 *   Usuarios: 
 *      type: object
 *      required:
 *          - id
 *          - usuario
 *      properties:
 *          id:
 *              type: integer
 *              description: Clave Unica, autoincremental
 *          nombre: 
 *              type: string
 *              description: Nombre de la persona
 *          apellido:   
 *              type: string
 *              description: Apellido de la persona
 *          usuario: 
 *              type: string
 *              description: Nombre de usuario de la plataforma
 *          paswword: 
 *              type: string
 *              description: Contraseña de la cuenta de usuario
 *      example:
 *          id: 103
 *          nombre: Leonardo
 *          apellido: Jaloma
 *          usuario: leonardo.jal
 *          password: loMisde34@!nds2DG
 */


/**
 * @swagger
 *   paths:
 *       /usuarios:
 *           get:
 *               summary: Obtiene lista de los usuarios
 *               description: Obtiene la lista de todos los usuarios
 *               tags:
 *                  - Usuarios
 *               responses: 
 *                   '200':
 *                       description: Usuarios obtenidos con exito
 *                       content: 
 *                           application/json:
 *                           schema: 
 *                               type: json
 *                               items:
 *                                   $ref: '#/components/schemas/Usuarios'
 *           post: 
 *               summary: Crea un usuario
 *               description: Crea un nuevo usuario en el sistema
 *               tags:
 *                  - Usuarios
 *               requestBody:
 *                   requiered: true
 *                   content:
 *                       application/json:   
 *                          example: lol
 *               responses: 
 *                   '201': 
 *                       description: Usuario creado con exito
 *                   '400':
 *                       description: Error en la solicitud
 *       /usuarios/{:id}:
 *           get:
 *              summary: Obtiene un usuario por id
 *              description: Obtiene un usuario por el numero de id
 *              tags:
 *                - Usuarios
 *              responses:
 *                  '200': 
 *                      description: Retorna un json con los datos especificados.
 *                  
 */

