const User = require('../model/usersModel');
const Joi = require('joi');

const validateUser = (userData) => {
    const schema = Joi.object({
        username: Joi.string().min(3).max(20).alphanum(),
        dateOfBirth: Joi.date(),
        age: Joi.number(),
        religion: Joi.string().min(5).max(20).alphanum(),
        skinColor: Joi.string().min(5).max(10).alphanum(),
        country: Joi.string().max(50).alphanum(),
        governorate: Joi.string().max(50).alphanum(),
        hobby: Joi.string().max(50).alphanum(),
        profession: Joi.string().max(50).alphanum(),
        EducationDegree: Joi.string().max(50).alphanum(),
    });

    return schema.validate(userData);
};

const CreateUser = async (req, res) => {
    try {
        const validate = validateUser(req.body);

        if (validate.error) {
            return res.status(400).json({ error: validate.error.details });
        }
        const newUser = new User(req.body);

        const savedUser = await newUser.save();
        const userId = savedUser._id;

        req.session.users = req.session.users || {};
        req.session.users[userId] = savedUser;

        res.status(201).json({
            message: 'User created successfully',
            user: savedUser,
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({
            message: 'Internal Server Error',
        });
    }
};

const FindUserById = async (req, res) => {
    const { id } = req.params;
    try {
        if (id) {
            const userInfo = req.session.users;

            if (userInfo && userInfo[id]) {
                res.status(200).json({
                    message: 'The User Found From Session!',
                    user: userInfo[id],
                });
            } else {
                const FindUser = await User.findById(id);

                if (!FindUser) {
                    return res.status(404).json({ error: "The User not found" });
                }

                req.session.users[id] = FindUser;

                res.status(200).json({
                    message: 'The User Found and cached!',
                    user: FindUser,
                });
            }
        } else {
            res.status(400).json({
                error: 'User ID not provided',
            });
        }
    } catch (error) {
        console.error('Error Find user:', error);
        res.status(500).json({
            message: 'Internal Server Error',
        });
    }
};

const FindAllUsers = async (req, res) => {
    try {
        const FindUsers = await User.find({ isDeleted: false });

        res.status(200).json({
            message: 'The Users Found!',
            users: FindUsers,
        })
    } catch (error) {
        console.error('Error Find users:', error);
        res.status(500).json({
            message: 'Internal Server Error',
        });
    }
};

const EditByUser = async (req, res) => {
    const { id } = req.params;

    try {
        const validate = validateUser(req.body);

        if (validate.error) {
            return res.status(400).json({ error: validate.error.details });
        }

        const EditUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        // ? the updated document should be returned after the update operation is complete.

        if (!EditUser) {
            return res.status(404).json({ error: "The User not found" });
        } else {
            res.status(200).json({
                message: 'The User Updated!',
                user: EditUser,
            });
        }
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({
            message: 'Internal Server Error',
        });
    }
};

const SoftDeleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const DeleteUser = await User.findByIdAndUpdate(id,
            { isDeleted: true },
            { new: true });

        if (!DeleteUser) {
            return res.status(404).json({ error: "The User not found" });
        } else {
            res.status(200).json({
                message: 'The User Deleted!',
                user: DeleteUser,
            });
        }
    } catch (error) {
        console.error('Error Find user:', error);
        res.status(500).json({
            message: 'Internal Server Error',
        });
    }
};


const FilterUsers = async (req, res) => {
    let query = req.query;
    try {

        const validate = validateUser(query);

        if (validate.error) {
            return res.status(400).json({ error: validate.error.details });
        }

        if (Object.keys(query).length === 0) {
            const allUsers = await User.find({ isDeleted: false });
            res.status(200).json({
                message: 'All Users Found!',
                length: allUsers.length,
                users: allUsers,
            });
        } else {
            const filteredUsers = await User.find({ ...query, isDeleted: false });

            if (!filteredUsers || filteredUsers.length === 0) {
                return res.status(404).json({ error: "No users found with the specified criteria" });
            } else {
                res.status(200).json({
                    message: 'Users Found!',
                    length: filteredUsers.length,
                    users: filteredUsers,
                });
            }
        }
    } catch (error) {
        console.error('Error filtering users:', error);
        res.status(500).json({
            message: 'Internal Server Error',
        });
    }
};



module.exports = {
    CreateUser,

    FindAllUsers,

    FindUserById,

    EditByUser,

    SoftDeleteUser,

    FilterUsers,
};