const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");

app.use(express.json());

//IMPORTO RUTAS
const { animesRoutes, usersRoutes, chaptersRoutes } = require("./routes");

//USO DE RUTAS EN MODULOS DISTINTOS
app.use("/api/animes", animesRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/chapters", chaptersRoutes);

//CONEXION A LA BASE DE DATOS
mongoose.connect(process.env.DB, { useNewUrlParser: true }, (error, result) => {
  if (error) {
    return console.log(`Error al conectar a la base de datos ${error}`);
  }
  console.log("Conexion a la base de datos establecida.");
  app.listen(process.env.PORT, () => {
    console.log(`Hamster rolling on port ${process.env.PORT}`);
  });
});
