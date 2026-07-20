import Task from "../Model/Task.js";

// ===============================
// Create Task
// ===============================
export const createTask = async (req, res) => {
    try {

        const { title, status } = req.body;

        // Validation
        if (!title || title.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Task title is required."
            });
        }

        const validStatus = ["Pending", "Completed"];

        if (status && !validStatus.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Status must be Pending or Completed."
            });
        }

        const task = await Task.create({
            title: title.trim(),
            status: status || "Pending",
            user: req.user.id
        });

        res.status(201).json({
            success: true,
            message: "Task created successfully.",
            task
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// ===============================
// Get Logged In User Tasks
// ===============================
export const getTasks = async (req, res) => {

    try {

        const tasks = await Task.find({
            user: req.user.id
        }).sort({
            createdAt: -1
        });

        res.status(200).json({
            success: true,
            totalTasks: tasks.length,
            tasks
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ===============================
// Update Task
// ===============================
export const updateTask = async (req, res) => {

    try {

        const { id } = req.params;

        const { title, status } = req.body;

        const task = await Task.findById(id);

        if (!task) {

            return res.status(404).json({
                success: false,
                message: "Task not found."
            });

        }

        // Owner Check
        if (task.user.toString() !== req.user.id) {

            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this task."
            });

        }

        if (title) {
            task.title = title.trim();
        }

        if (status) {

            const validStatus = ["Pending", "Completed"];

            if (!validStatus.includes(status)) {

                return res.status(400).json({
                    success: false,
                    message: "Invalid status."
                });

            }

            task.status = status;

        }

        await task.save();

        res.status(200).json({
            success: true,
            message: "Task updated successfully.",
            task
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ===============================
// Delete Task
// ===============================
export const deleteTask = async (req, res) => {

    try {

        const { id } = req.params;

        const task = await Task.findById(id);

        if (!task) {

            return res.status(404).json({
                success: false,
                message: "Task not found."
            });

        }

        // Owner Check
        if (task.user.toString() !== req.user.id) {

            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this task."
            });

        }

        await task.deleteOne();

        res.status(200).json({
            success: true,
            message: "Task deleted successfully."
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};



//
export const getSingleTask = async (req, res) => {

    try {

        const task = await Task.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!task) {

            return res.status(404).json({
                success: false,
                message: "Task not found."
            });

        }

        res.status(200).json({
            success: true,
            task
        });

    }

    catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};