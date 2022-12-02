const Anime = require("../models/anime");

const createAnime = (req, res) => {
  const { title, description, image, category } = req.body;

  const newAnime = new Anime({
    title,
    description,
    image,
    category,
  });

  Anime.findOne({ title: newAnime.title }, (error, anime) => {
    if (error) {
      return res.status(500).send({
        message: "Se produjo un error al crear el anime.",
        error,
      });
    }
    if (anime) {
      return res
        .status(400)
        .send({ message: "El titulo ya se encuentra en uso." });
    }
    newAnime.save((err) => {
      if (err) {
        res.status(400).send({
          message: "Se produjo un error al crear el anime.",
          error,
        });
      }
      res.status(201).send({
        message: "la creacion del anime se realizo correctamente",
      });
    });
  });
};

const getAll = (req, res) => {
  Anime.find((error, data) => {
    if (error) {
      return res
        .status(500)
        .send({ message: "Error al traer todos los animes" });
    }
    return res.status(200).send(data);
  });
};

const getOne = (req, res) => {
  Anime.findById(req.params.id, (error, data) => {
    if (error) {
      return res.status(500).send({ message: "Error al traer el anime" });
    }
    if (!data) {
      return res
        .status(400)
        .send({ message: "No se encontro un anime con ese id" });
    }
    return res.status(200).send(data);
  });
};

const deleteAnime = (req, res) => {
  Anime.findByIdAndDelete(req.params.id, (error, data) => {
    if (error) {
      return res.status(500).send({ message: "Error al traer el anime" });
    }
    if (!data) {
      return res
        .status(400)
        .send({ message: "No se encontro un anime con ese id" });
    }
    return res.status(200).send({ message: "Anime borrado con exito!" });
  });
};

const updateAnime = (req, res) => {
  Anime.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true },
    (error, data) => {
      if (error) {
        return res.status(500).send({ message: "Error al actualizar anime" });
      }
      if (!data) {
        return res
          .status(400)
          .send({ message: "No se encontro un anime con ese id" });
      }
      res.status(200).json(data);
    }
  );
};

module.exports = {
  createAnime,
  getAll,
  getOne,
  deleteAnime,
  updateAnime,
};
