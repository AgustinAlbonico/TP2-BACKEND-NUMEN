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
let dbURI = process.env.DB;
mongoose.connect(dbURI, { useNewUrlParser: true }, (error, result) => {
  if (error) {
    return console.log(`Error al conectar a la base de datos ${error}`);
  }
  console.log("Conexion a la base de datos establecida.");
  let port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Hamster rolling on port ${port}`);
  });
});
