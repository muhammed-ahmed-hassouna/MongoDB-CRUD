const express = require('express');
const router = express.Router()

const userController = require('../controller/userController');

router.post("/CreateUser", userController.CreateUser);

router.get("/FindAllUsers", userController.FindAllUsers);

router.get("/FindUserById/:id", userController.FindUserById);

router.put("/EditByUser/:id", userController.EditByUser);

router.put("/SoftDeleteUser/:id", userController.SoftDeleteUser);

router.get("/FilterUsers", userController.FilterUsers);

router.get("/getUserFromSession", userController.getUserFromSession);

module.exports = router;