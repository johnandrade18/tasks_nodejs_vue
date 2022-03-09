import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

// Importar coneccion a la base de datos
import db from "./config/db.js";

// importar rutas
import indexRoutes from "./routes/index.routes.js";

// Importar modelos
import taskModel from "./models/Task.js";


// variable de puerto
const port = process.env.PORT || 5000;

// configuraciones
dotenv.config({
    path: ".env"
});

// instancia de express
const app = express();

//Conexion a la base de datos
taskModel.sync();
db.authenticate()
    .then(() => console.log("DB conectada"))
    .catch((err) => console.log("Error al conectar a la DB: ", err));

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// rutas
app.use('/api/tasks',indexRoutes);
// app.use("/api", adminsRoute);

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});

export default app;