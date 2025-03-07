import { Router } from "express";
import { login, logout, register, update } from "../controllers/user.controller.js";
import auth from "../middlewares/auth.js"; 
import { upload } from "../middlewares/multer.js";

const router = Router();

router.route('/register').post(upload,register)
router.route('/login').post(login)
router.route('/profile/update').post(auth,upload,update)
router.route('/logout').get(logout)


export default router;