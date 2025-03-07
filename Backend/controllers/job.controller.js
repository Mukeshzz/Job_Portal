import { Jobs } from "../models/job.model.js";

//student
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      exprience,
      position,
      companyId,
    } = req.body;
    const userId = req.id;
    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !exprience ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    const job = await Jobs.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      exprienceLevel: exprience,
      position,
      company: companyId,
      createdBy: userId,
    });
    return res.status(201).json({
      message: "New Job Created Successfully",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//student
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        {
          title: { $regex: keyword, $options: "i" },
        },
        {
          description: { $regex: keyword, $options: "i" },
        },
      ],
    };
    const jobs = await Jobs.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });
    if (!jobs) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      succuess: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//students
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Jobs.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }
    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//admin
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Jobs.find({ createdBy: adminId });

    if (!jobs) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
