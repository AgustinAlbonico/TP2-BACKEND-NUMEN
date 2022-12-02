const Anime = require("../models/anime");
const Capitulo = require("../models/capitulo");

const getChaptersByAnime = (req, res) => {
  let chapters = [{}];
  Anime.findById(req.params.id, (error, anime) => {
    if (error) {
      return res.status(500).send({ message: "Error al traer el anime" });
    }
    if (!anime) {
      return res
        .status(400)
        .send({ message: "No se encontro un anime con ese id" });
    }
    anime.chaptersIDS.forEach(cap => {
        Capitulo.findById(cap._id.toString(), (error, c) =>{
            if(error){
                return res.status(500).send({ message: "Error al traer el capitulo" });
            }
            chapters += c;
        })
    });
    return res.status(200).json(chapters);
  });
};

const updateChapter = (req, res) => {
    Capitulo.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true },
        (error, data) => {
          if (error) {
            return res.status(500).send({ message: "Error al actualizar capitulo" });
          }
          if (!data) {
            return res
              .status(400)
              .send({ message: "No se encontro un capitulo con ese id" });
          }
          res.status(200).json(data);
        }
      );
}

const deleteChapter = (req, res) => {
    Capitulo.findByIdAndDelete(req.params.id, (error, cap) => {
        if (error) {
          return res.status(500).send({ message: "Error al traer el capitulo" });
        }
        if (!cap) {
          return res
            .status(400)
            .send({ message: "No se encontro un capitulo con ese id" });
        }
        return res.status(200).send({ message: "Capitulo borrado con exito!" });
      });
}

module.exports = {
  getChaptersByAnime,
  updateChapter,
  deleteChapter,
};
