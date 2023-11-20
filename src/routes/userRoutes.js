const express = require('express');
const UserController = require('../controllers/UserController');
const OrderController = require('../controllers/OrderController');

const router = express.Router();

// User routes
router.post('/users', UserController.createUser);
router.get('/users', UserController.getAllUsers);
router.get('/users/:userId', UserController.getUserById);
router.put('/users/:userId', UserController.updateUser);
router.delete('/users/:userId', UserController.deleteUser);

// Order routes
router.post('/users/:userId/orders', OrderController.placeOrder);
router.get('/users/:userId/order-history', OrderController.getOrderHistory);

module.exports = router;
