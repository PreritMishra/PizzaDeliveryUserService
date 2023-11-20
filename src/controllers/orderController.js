const { User, Order } = require('../models');

const OrderController = {
  // Place a new order for a user
  placeOrder: async (req, res) => {
    try {
      const { userId } = req.params;
      const { pizzaName, quantity } = req.body;

      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Create a new order
      const order = await Order.create({
        pizzaName,
        quantity,
      });

      // Associate the order with the user
      await user.addOrder(order);

      return res.status(201).json(order);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Get all orders for a user
  getOrderHistory: async (req, res) => {
    try {
      const { userId } = req.params;

      const user = await User.findByPk(userId, { include: 'orders' });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.json(user.orders);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = OrderController;
