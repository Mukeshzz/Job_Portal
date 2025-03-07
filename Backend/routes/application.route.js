import { Router } from "express";
import auth from "../middlewares/auth.js"; 
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/application.controller.js";


const router = Router();

router.route("/apply/:id").get(auth, applyJob)
router.route("/get").get(auth, getAppliedJobs);
router.route("/:id/applicants").get(auth, getApplicants)
router.route("/status/:id/update").post(auth, updateStatus)


export default router;