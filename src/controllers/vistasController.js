import __dirname from "../utils/utils.js";
import path from "path";


export class VistasController {
    static getHome = async (req, res, next) => {
      try {
        res.setHeader("Content-Type", "text/html");
        res
          .status(200)
          .sendFile(path.join(__dirname, "../public/html/index.html"));
      } catch (error) {
        req.logger.error(
          JSON.stringify(
            {
              name: error.name,
              message: error.message,
              stack: error.stack,
              code: error.code,
            },
            null,
            5
          )
        );
        return next(error);
      }
    };
}
