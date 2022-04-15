import express from "express"
import { isAuth, isAllowed } from '../config/middleware'

import User from '../components/user'

const router = express.Router();

// User Login
router.post('/login', User.login)
router.post('/color-primary', isAuth, User.userColor)
router.post('/color-prefer', isAuth, User.colorPrefer)
export default router