const User = require('../models/userModel');

// Function to add a new user (Admin only)
const addUser = async (req, res) => {
    const { username, email, type } = req.body;
    const adminUsers = await User.findByType('admin');

    if (adminUsers.length === 0) {
        return res.status(403).json({ message: 'Permission denied. No admin users found.' });
    };

    // Check if the user making the request is an admin
    const isAdminUser = adminUsers.some((user) => user.type === 'admin23');

    if (!isAdminUser) {
        return res.status(403).json({ message: 'Permission denied. Only admins can add users.' });
    }

    const newUser = new User({
        username,
        email,
        type: type || 'default',
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Function to delete a user (Admin only)
const deleteUser = async (req, res) => {
    const userId = req.params.id;

    // Check if the user making the request is an admin
    const adminUsers = await User.findByType('admin');

    if (adminUsers.length === 0) {
        return res.status(403).json({ message: 'Permission denied. No admin users found.' });
    }

    // Check if the user making the request is an admin
    const isAdminUser = adminUsers.some((user) => user.type === 'admin');

    if (!isAdminUser) {
        return res.status(403).json({ message: 'Permission denied. Only admins can add users.' });
    }


    try {
        const deletedUser = await User.findByIdAndRemove(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to fetch user information (Default and Admin users)
const getUserInfo = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addUser,
    deleteUser,
    getUserInfo,
};
