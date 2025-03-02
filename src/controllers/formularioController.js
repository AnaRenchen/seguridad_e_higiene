import { sendEmail } from "../config/mailer.js";

export class formularioController{

    static sendFormulario = async (req, res, next) =>{
        try {

            const {nombre, email, mensaje} = req.body;

            //Validación de campos obligatorios
           if (!nombre || !email || !mensaje) {
           return res.status(400).json({ error: "Por favor, complete todos los campos." });
          }

       //Validación de formato de email
       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
       if (!emailRegex.test(email)) {
       return res.status(400).json({ error: "Por favor, ingrese un email válido." });
     }

    //Sanitización básica (prevención XSS)
    const sanitizeInput = (input) => input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const sanitizedMessage = sanitizeInput(mensaje);

      //Evitar spam (simulación de rate limiting básico)
  if (global.lastSubmissionTime && Date.now() - global.lastSubmissionTime < 10000) { // 10 segundos
    return res.status(429).json({ error: "Por favor, espera antes de enviar otro mensaje." });
  }
  global.lastSubmissionTime = Date.now();

  //Se incluye tanto html como text para mayor compatibilidad con los clientes de correo electrónico
            const subject = 'Nuevo mensaje desde el formulario de la web CHST';
            const text = `Nombre: ${nombre}\nEmail: ${email}\nMensaje: ${sanitizedMessage}`;
            const html = `
            <!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nuevo mensaje desde el formulario de la web</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: Arial, sans-serif;
            color: #333;
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
        }

        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        header {
            background-color: #87a7ae;
            color: #fff;
            padding: 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }

        header h1 {
            font-size: 24px;
            font-weight: 600;
        }

        .content {
            padding: 20px;
        }

        .content h2 {
            color: #87a7ae;
            font-size: 20px;
            margin-bottom: 15px;
        }

        .content p {
            font-size: 16px;
            line-height: 1.5;
            color: #454344;
        }

        .footer {
            text-align: center;
            padding: 10px;
            font-size: 14px;
            color: #888;
        }

        .footer a {
            color: #87a7ae;
            text-decoration: none;
        }

        .message {
            background-color: #f4f4f4;
            border: 1px solid #ddd;
            padding: 15px;
            margin-top: 20px;
            border-radius: 4px;
            color: #333;
        }

        .message strong {
            font-weight: bold;
        }

    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>Mensaje desde la web CHST de Sebastián Diaco y Asoc.</h1>
        </header>

        <div class="content">
            <h2>Detalles del mensaje:</h2>
            <p><strong>Nombre:</strong> ${nombre}</p>
            <p><strong>Email:</strong> ${email}</p>
            <div class="message">
                <p><strong>Mensaje:</strong></p>
                <p>${sanitizedMessage}</p>
            </div>
        </div>

        <div class="footer">
            <p> <strong>CHST de Sebastián Diaco y Asoc.</strong> </p>
        </div>
    </div>
</body>
</html>`;
          
            // Enviar el correo
            await sendEmail(subject, text, html);
          
            res.setHeader("Content-Type", "application/json");
            return res.status(200).json({ message: "Su mensaje ha sido enviado con éxito. Nos pondremos en contacto a la brevedad."});

            
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