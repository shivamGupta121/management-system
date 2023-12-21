const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes accessible to admins only
router.post('/', userController.addUser);
router.delete('/:id', userController.deleteUser);

// Routes accessible to both default and admin users
router.get('/:id', userController.getUserInfo);
module.exports = router;
