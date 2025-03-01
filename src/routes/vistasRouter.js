import { Router } from "express";
import { VistasController } from "../controllers/vistasController.js";

export const routerVistas = Router();

routerVistas.get("/", VistasController.getHome);

