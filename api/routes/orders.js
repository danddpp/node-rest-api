const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/check-auth');
const OrdersController = require('../controllers/orders');


router.get('/', checkAuth, OrdersController.orders_get_all);
router.post('/', checkAuth, OrdersController.create_order);
router.get('/:orderId', checkAuth, OrdersController.get_order);
router.delete('/:orderId', checkAuth, OrdersController.remove_order);




module.exports = router;