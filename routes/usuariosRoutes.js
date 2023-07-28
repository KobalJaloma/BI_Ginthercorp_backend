import express from "express";
import { createUsuario, getAllUsuarios, getUsuarioById } from "../controllers/usuariosController";

export const usuariosRoutes = express.Router();

//gets
usuariosRoutes.get('/', getAllUsuarios);
usuariosRoutes.get('/:id', getUsuarioById); //se le pasa el id

//post
usuariosRoutes.post('/', createUsuario);

/**
 * 
 * paths:
 *     /users:
 *         get:
 *             summary: Returns a list of users.
 *             description: Optional extended description in CommonMark or HTML
 *             responses:
 *                 '200':
 *                     description: A JSON array of user names
 *                     content:
 *                         application/json:
 *                     schema: 
 *                         type: array
 *                         items: 
 *                             type: string
*/