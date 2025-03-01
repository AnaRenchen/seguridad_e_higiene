import { Router } from "express";
import { formularioController } from "../controllers/formularioController.js";

export const routerFormulario = Router();

routerFormulario.post("/", formularioController.sendFormulario);

