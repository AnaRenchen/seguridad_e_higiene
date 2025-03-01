import express from "express";
import cors from "cors";
import path from "path";
import { config } from "./config/config.js";
import __dirname from "./utils/utils.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { logger, middLogger } from "./utils/logger.js";
import { routerVistas } from "./routes/vistasRouter.js";
import { routerFormulario } from "./routes/formularioRouter.js";



const PORT = config.PORT;

const app = express();

app.use(express.json());
app.use(middLogger);
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, "../public")));

app.use("/", routerVistas);
app.use("/api/formulario", routerFormulario)

app.listen(PORT, () => {
    logger.info("Server listening...");
  });

app.use(errorHandler);