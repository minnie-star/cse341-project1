const {getDb} = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllUsers = async (req, res) => {
  //swagger.tags=['users']
    const result = await getDb().collection('users').find();
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    });
}

const getUserById = async (req, res) => {
  //swagger.tags=['users']
    const db = getDb();
    const userId = new ObjectId(req.params.id);
    const user = await db.collection('users').findOne({ _id: userId });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
};

// Create a new user
const createUser = async (req, res) => {
  //swagger.tags=['users']
  try {
    const db = getDb();
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    // Ensure all fields are present
    if (!user.firstName || !user.lastName || !user.email || !user.favoriteColor || !user.birthday) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const result = await db.collection('users').insertOne(user);
    res.status(201).json({ id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a user by ID
const updateUser = async (req, res) => {
  //swagger.tags=['users']
  try {
    const db = getDb();
    const userId = new ObjectId(req.params.id);

    const update = {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
      }
    };

    const result = await db.collection('users').updateOne({ _id: userId }, update);

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.sendStatus(204); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
  //swagger.tags=['users']
  try {
    const db = getDb();
    const userId = new ObjectId(req.params.id);

    const result = await db.collection('users').deleteOne({ _id: userId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }               

    res.sendStatus(204); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};