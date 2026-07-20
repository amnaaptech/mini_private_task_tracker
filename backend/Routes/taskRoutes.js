import express from "express";
import {
  createTask,
  getTasks,
  getSingleTask,
  updateTask,
  deleteTask,
} from "../Controller/taskController.js";

import authMiddleware from "../Middelware/authMiddleware.js";

const router = express.Router();

// Create Task
router.post("/add", authMiddleware, createTask);

// Get Logged-in User Tasks
router.get("/show", authMiddleware, getTasks);


// Get Single Task
router.get("/get/:id", authMiddleware, getSingleTask);


// Update Task
router.put("/update/:id", authMiddleware, updateTask);

// Delete Task
router.delete("/delete/:id", authMiddleware, deleteTask);

export default router;