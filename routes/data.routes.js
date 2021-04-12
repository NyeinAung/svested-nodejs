import DataController from '../controllers/data.controller';
import * as express from 'express';
const router = express.Router()

router.get("/", DataController.getAllDatas);
router.post("/save", DataController.saveData);

module.exports = router