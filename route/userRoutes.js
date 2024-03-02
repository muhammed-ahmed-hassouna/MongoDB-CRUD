const express = require('express');
const router = express.Router()

const userController = require('../controller/userController');

/**
 * @swagger
 * /FindAllUsers:
 *   get:
 *     summary: Get all users
 *     description: Endpoint to retrieve a list of all users.
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

router.get("/FindAllUsers", userController.FindAllUsers);

/**
 * @swagger
 * /FindUserById/{id}:
 *   get:
 *     summary: Get user by id
 *     description: Endpoint to retrieve a single user by id.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: The ID of the user to retrieve.
 *     responses:
 *       200:
 *         description: the user you want
 *       404:
 *         description: User not found
*/
router.get("/FindUserById/:id", userController.FindUserById);

/**
 * @swagger
 * /FilterUsers:
 *   get:
 *     summary: Filter users
 *     description: Endpoint to filter users based on specified criteria.
 *     parameters:
 *       - in: query
 *         name: username
 *         type: string
 *         description: The username to filter users.
 *       - in: query
 *         name: dateOfBirth
 *         type: string
 *         format: date
 *         description: The date of birth to filter users (YYYY-MM-DD).
 *       - in: query
 *         name: age
 *         type: integer
 *         description: The age to filter users.
 *       - in: query
 *         name: religion
 *         type: string
 *         description: The religion to filter users.
 *       - in: query
 *         name: skinColor
 *         type: string
 *         description: The skin color to filter users.
 *       - in: query
 *         name: country
 *         type: string
 *         description: The country to filter users.
 *       - in: query
 *         name: governorate
 *         type: string
 *         description: The governorate to filter users.
 *       - in: query
 *         name: hobby
 *         type: string
 *         description: The hobby to filter users.
 *       - in: query
 *         name: profession
 *         type: string
 *         description: The profession to filter users.
 *       - in: query
 *         name: EducationDegree
 *         type: string
 *         description: The education degree to filter users.
 *     responses:
 *       200:
 *         description: Users found based on the specified criteria
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: Success message
 *             length:
 *               type: integer
 *               description: Number of users found
 *             users:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       404:
 *         description: No users found with the specified criteria
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               description: Error message
 *       400:
 *         description: Bad request, validation error
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: array
 *               description: Validation error details
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: Error message for internal server error
 */

router.get("/FilterUsers", userController.FilterUsers);

/**
 * @swagger
 * /CreateUser:
 *   post:
 *     summary: Create a new user
 *     description: Endpoint to create a new user.
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: The user information in JSON format.
 *         schema:
 *           $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully
 *         schema:
 *           $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request, validation error
 */

router.post("/CreateUser", userController.CreateUser);


/**
 * @swagger
 * /EditByUser/{id}:
 *   put:
 *     summary: Edit user by ID
 *     description: Endpoint to edit a user by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: The ID of the user to edit.
 *       - in: body
 *         name: user
 *         description: The updated user information.
 *         schema:
 *           $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: Success message
 *             user:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               description: Error message
 *       400:
 *         description: Bad request, validation error
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: array
 *               description: Validation error details
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: Error message for internal server error
 */

router.put("/EditByUser/:id", userController.EditByUser);


/**
 * @swagger
 * /SoftDeleteUser/{id}:
 *   put:
 *     summary: Soft delete user by ID
 *     description: Endpoint to soft delete a user by ID (mark as deleted).
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: The ID of the user to soft delete.
 *     responses:
 *       200:
 *         description: User soft deleted successfully
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: Success message
 *             user:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               description: Error message
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: Error message for internal server error
 */
router.put("/SoftDeleteUser/:id", userController.SoftDeleteUser);


module.exports = router;