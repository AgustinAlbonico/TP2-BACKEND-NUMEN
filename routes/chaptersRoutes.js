const router = require("express").Router();
const { chapterController } = require("../controllers");

//RUTAS
//router.post('/serie', chapterController.createChapter);
router.get('/:id', chapterController.getChaptersByAnime);
router.put('/:id', chapterController.updateChapter);
router.delete('/:id', chapterController.deleteChapter);

module.exports = router;