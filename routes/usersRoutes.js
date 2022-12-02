const router = require("express").Router();
const { userController } = require("../controllers");

const { userSchema } = require("../controllers/schema");

//RUTAS
router.post("/login", userSchema, userController.login);
router.post("/register", userController.register);
router.post("/addanime", userController.addAnime);

module.exports = router;