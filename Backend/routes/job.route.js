import { Router } from "express";
import auth from "../middlewares/auth.js"; 
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/job.controller.js";


const router = Router();

router.route("/post").post(auth, postJob);
router.route("/get").get(auth, getAllJobs);
router.route("/getadminjobs").post(auth, getAdminJobs);
router.route("/get/:id").post(auth, getJobById);


export default router;