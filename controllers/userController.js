const User = require("../models/user");
const Anime = require("../models/anime");
const { authService, userService } = require("../services");
const { validationResult } = require("express-validator");

const login = async (req, res) => {
  const { email, password } = req.body;

  const resultValidation = validationResult(req);
  const hasErrors = !resultValidation.isEmpty();

  if (hasErrors) {
    return res.status(400).send(resultValidation);
  }

  const result = await userService
    .login(email, password)
    .catch((error) => error);
  return res.status(result.status).send(result);
};

const register = (req, res) => {
  const { username, email, password } = req.body;

  const newUser = new User({
    username,
    email,
    password,
  });

  User.findOne({ email: newUser.email }, (error, user) => {
    if (error) {
      return res.status(500).send({
        message: "Se produjo un error al registrar el usuario.",
        error,
      });
    }
    if (user) {
      return res
        .status(400)
        .send({ message: "El email ya se encuentra en uso." });
    }
    User.findOne({ username: newUser.username }, (error, us) => {
      if (error) {
        return res.status(500).send({
          message: "Se produjo un error al registrar el usuario.",
          error,
        });
      }
      if (us) {
        return res
          .status(400)
          .send({ message: "El nombre de usuario ya se encuentra en uso." });
      }
      newUser.save((err) => {
        if (err) {
          res.status(400).send({
            message: "Se produjo un error al registrar el usuario.",
            error,
          });
        }
        res.status(201).send({
          message: "El registro se completo exitosamente",
          token: authService.createToken(),
        });
      });
    });
  });
};

const sayHi = (req, res) => {
  res.status(200).send("Hola mundo, estas autenticado!");
};

const addAnime = (req, res) => {
  const { userID, animeID } = req.body;

  Anime.findById(animeID, (error, anime) => {
    if (error) {
      return res.status(500).send({
        message: "Se produjo un error al encontrar anime.",
        error,
      });
    }
    if (!anime) {
      return res
        .status(400)
        .send({ message: "No se encontro el anime ingresado" });
    }
    User.findById(userID, (error, user) => {
      if (error) {
        return res.status(500).send({
          message: "Se produjo un error al encontrar usuario.",
          error,
        });
      }
      if (!user) {
        return res
          .status(400)
          .send({ message: "No se encontro el usuario ingresado" });
      }
      
      //Lo hice asi pq con un foreach no me funcionaba y usando "$addToSet" no me dejaba mandar un mensaje en caso de que encuentre un repetido
      let animeRepetido;
      user.animesIDS.find((anime) => {
        animeRepetido = anime._id.toString() === animeID;
      });

      if (animeRepetido) {
        return res.status(402).send({
          message: "Este anime ya se encuentra en tus favoritos!",
        });
      } else {
        User.findByIdAndUpdate(
          userID,
          { $push: { animesIDS: animeID } },
          (error) => {
            if (error) {
              return res.status(500).send({
                message: "Se produjo un error al encontrar usuario.",
                error,
              });
            }
            return res
              .status(200)
              .send({ message: "Anime agregado correctamente" });
          }
        );
      }
    });
  });
};

module.exports = {
  login,
  register,
  sayHi,
  addAnime,
};
