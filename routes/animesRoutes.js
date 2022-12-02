const router = require("express").Router();
const { animeController } = require("../controllers");

//RUTAS
router.post('/new', animeController.createAnime);
router.get('/', animeController.getAll);
router.get('/:id', animeController.getOne);
router.delete('/:id', animeController.deleteAnime);
router.put('/:id', animeController.updateAnime);

module.exports = router;