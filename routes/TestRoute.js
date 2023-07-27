import { createTest, getAllTests } from "../controllers/testController.js";
import express from "express";

export const TestRoute = express.Router();

//Gets
TestRoute.get('/', getAllTests);

//Posts
TestRoute.post('/', createTest);