// user-service/src/controllers/UserController.js
const { User, Order } = require('../models');

const UserController = {
  createUser: async (req, res) => {
    try {
      const { username } = req.body;
      const newUser = await User.create({ username });
      return res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await User.findAll({ include: 'orders' });
      return res.json(users);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getUserById: async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await User.findByPk(userId, { include: 'orders' });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { userId } = req.params;
      const { username } = req.body;

      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      user.username = username;
      await user.save();

      return res.json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      await user.destroy();
      return res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = UserController;
