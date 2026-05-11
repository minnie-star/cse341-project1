const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllUsers = async (req, res) => {
    const result = await mongodb.getDb().collection('users').find();
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    });
}

const getUserById = async (req, res) => {
    const db = mongodb.getDb();
    const userId = new ObjectId(req.params.id);
    const user = await db.collection('users').findOne({ _id: userId });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(user[0]);
};

module.exports = {
    getAllUsers,
    getUserById
};