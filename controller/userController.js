const User = require('../model/usersModel');
const Joi = require('joi');

const validateUser = (userData) => {
    const schema = Joi.object({
        username: Joi.string().min(3).max(20).required(),
        dateOfBirth: Joi.date().required(),
        age: Joi.number().required(), 
        religion: Joi.string().min(5).max(20).required(),
        skinColor: Joi.string().min(5).max(10).required(),
        country: Joi.string().max(50).required(),
        governorate: Joi.string().max(50).required(),
        hobby: Joi.string().max(50).required(),
        profession: Joi.string().max(50).required(),
        EducationDegree: Joi.string().max(50).required(),
    });

    return schema.validate(userData);
};
const CreateUser = async (req, res) => {
    const { username, dateOfBirth, age, religion, skinColor, country, governorate, hobby, profession, EducationDegree } = req.body;
    
    try {
        const validate = validateUser({ username, dateOfBirth, age, religion, skinColor, country, governorate, hobby, profession, EducationDegree });

        if (validate.error) {
            return res.status(400).json({ error: validate.error.details });
        }
        const newUser = new User({
            username,
            dateOfBirth,
            age,
            religion,
            skinColor,
            country,
            governorate,
            hobby,
            profession,
            EducationDegree
        });

        const savedUser = await newUser.save();

        req.session.user = savedUser;

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

const getUserFromSession = (req, res) => {
    const user = req.session.user;

    if (user) {
        res.status(200).json({
            user,
        });
    } else {
        res.status(404).json({
            message: 'User not found in session',
        });
    }
};
const FindUserById = async (req, res) => {
    const { id } = req.params;   
    try {
        const FindUser = await User.findById(id);

        if (!FindUser) {
            return res.status(404).json({ error: "The User not found" });
        } else {
            res.status(200).json({
                message: 'The User Found!',
                user: FindUser,
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
        const FindUsers = await User.find({isDeleted : false});

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

const EditByUser = async (req,res) => {
    const { id } = req.params;
    const { username, dateOfBirth, age, religion, skinColor, country, governorate, hobby, profession, EducationDegree } = req.body;

    try {
        const validate = validateUser({ username, dateOfBirth, age, religion, skinColor, country, governorate, hobby, profession, EducationDegree });

        if (validate.error) {
            return res.status(400).json({ error: validate.error.details });
        }

        const EditUser = await User.findByIdAndUpdate(id,{
            $set : {
                username, 
                dateOfBirth, 
                age, 
                religion, 
                skinColor, 
                country, 
                governorate, 
                hobby, 
                profession, 
                EducationDegree
            }
        }, { new : true}); // ? the updated document should be returned after the update operation is complete.

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
    try {
        let query = req.query;

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

    getUserFromSession
};