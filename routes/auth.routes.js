import { signup, login } from '../controllers/auth.controller';
import * as express from 'express';
const router = express.Router()

router.post('/signup', signup)

module.exports = router