import { Router } from "express";
import { login, logout, register, update } from "../controllers/user.controller.js";
import auth from "../middlewares/auth.js"; 

const router = Router();

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/updateProfile').post(auth,update)
router.route('/logout').get(logout)


export default router;