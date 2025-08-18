import express from 'express';
import cors from 'cors';
import sequelizeConfig from './.data/base_config.js';

const app = express();
const PORT = 3000;

app.use(cors())
   .use(express.json())
   .get("/", (req, res) => {
        res.send(`
            <html>
                <head>
                    <title>Servidor Express</title>
                    <style>
                        body { background-color: #f2f2f2; font-family: Arial, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; }
                        .container { background: #fff; padding: 2rem; border-radius: 12px; box-shadow: 0 0 12px rgba(0,0,0,0.1); text-align: center; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>🚀 Servidor Express Activo</h1>
                        <p>API corriendo en <strong>http://localhost:3000</strong></p>
                    </div>
                </body>
            </html>
        `);
    })
    .use((req, res) => { res.status(404).json({ error: "Ruta no encontrada" }) });

// Funcion para iniciar el servidor
(async function start() {
    // Conexion con la base de datos
    try {
        await sequelizeConfig.authenticate();
        console.log("Conexión establecida...");
    }
    catch (error) {
        console.log("Error, Imposible conectar a la bd...\n", error);
        process.exit(1);
    }

    app.listen(PORT, () => {
        console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
}());
