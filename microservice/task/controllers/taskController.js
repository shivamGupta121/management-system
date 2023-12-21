const Task = require('../models/taskModel');
const User = require('../../user/models/userModel');

const getAllTasks = async (req, res) => {
  const adminUsers = await User.findByType('admin');

  if (adminUsers.length === 0) {
    return res.status(403).json({ message: 'Permission denied. No admin users found.' });
  }

  // Check if the user making the request is an admin
  const isAdminUser = adminUsers.some((user) => user.type === 'admin');

  if (!isAdminUser) {
    return res.status(403).json({ message: 'Permission denied. Only admins can add users.' });
  }

  const userId = req.user.id; // Assuming user ID is available in the request, you might need to implement this based on your authentication system
  try {
    const tasks = await Task.find({ userId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTask = async (req, res) => {
  const { title, description, priority, dueDate, userId } = req.body;
  const adminUsers = await User.findByType('admin');

  if (adminUsers.length === 0) {
    return res.status(403).json({ message: 'Permission denied. No admin users found.' });
  }

  // Check if the user making the request is an admin
  const isAdminUser = adminUsers.some((user) => user.type === 'admin');

  if (!isAdminUser) {
    return res.status(403).json({ message: 'Permission denied. Only admins can add users.' });
  }

  const newTask = new Task({
    title,
    description,
    priority,
    dueDate,
    userId,
  });

  try {
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const markTaskAsComplete = async (req, res) => {
  const taskId = req.params.id;

  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.completed = true;
    await task.save();

    // Emit an event for the system (you need to implement this part)
    // You might use a message queue like RabbitMQ or implement a custom event system

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const searchAndSortTasks = async (req, res) => {
  // Check if the user making the request is an admin
  const adminUsers = await User.findByType('admin');
  const isAdminUser = adminUsers.some((user) => user.type === 'admin');

  if (!isAdminUser) {
    return res.status(403).json({ message: 'Permission denied. Only admins can search and sort tasks.' });
  }

  const { completionStatus, sortBy } = req.query;
  const userId = req.user.id; // Assuming user ID is available in the request, you might need to implement this based on your authentication system

  const query = { userId };

  if (completionStatus !== undefined) {
    query.completed = completionStatus === 'true';
  }

  try {
    let sortOptions = {};

    // Apply sorting based on the provided sortBy parameter
    if (sortBy === 'completionStatus') {
      sortOptions.completed = 1;
    } else if (sortBy === 'dueDate') {
      sortOptions.dueDate = 1;
    } else if (sortBy === 'priority') {
      sortOptions.priority = 1;
    }

    const tasks = await Task.find(query).sort(sortOptions);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  markTaskAsComplete,
  searchAndSortTasks
};
