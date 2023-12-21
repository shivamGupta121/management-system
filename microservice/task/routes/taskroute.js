const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/', taskController.getAllTasks);
router.post('/', taskController.createTask);
router.patch('/:id/complete', taskController.markTaskAsComplete);
router.get('/tasks/search-sort', taskController.searchAndSortTasks);

module.exports = router;
