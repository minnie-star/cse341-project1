/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: Returns a list of users
 *   post:
 *     summary: Create a new user
 *     responses:
 *       201:
 *         description: User created successfully
 *
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns a single user
 *       404:
 *         description: User not found
 *   put:
 *     summary: Update a user by ID
 *     responses:
 *       204:
 *         description: User updated successfully
 *   delete:
 *     summary: Delete a user by ID
 *     responses:
 *       204:
 *         description: User deleted successfully
 */

const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');

// Route to get all users
router.get('/', usersController.getAllUsers);

router.get('/:id', usersController.getUserById);

router.post('/', usersController.createUser);

router.put('/:id', usersController.updateUser);

router.delete('/:id', usersController.deleteUser);

module.exports = router;
