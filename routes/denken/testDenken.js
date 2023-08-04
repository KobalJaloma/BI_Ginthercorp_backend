import { testDenken } from "../../controllers/denken/testController.js";
import express from "express";

export const testDenkenRoutes = express.Router();

//gets
testDenkenRoutes.get('/', testDenken);

//post
