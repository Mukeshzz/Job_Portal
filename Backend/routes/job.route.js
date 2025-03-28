import { Router } from "express";
import auth from "../middlewares/auth.js"; 
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/job.controller.js";


const router = Router();

router.route("/post").post(auth, postJob);
router.route("/get").get(getAllJobs);
router.route("/getadminjobs").get(auth, getAdminJobs);
router.route("/get/:id").get(auth, getJobById);


export default router;