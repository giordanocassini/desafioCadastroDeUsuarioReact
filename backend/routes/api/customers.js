const express = require('express');
const router = express.Router();
const customersController = require('../../controllers/customersController');

router.route('/')
    .get(customersController.getAllCustomers)
    .post(customersController.createNewCustomer)
    .put(customersController.updateCustomer)
    .delete(customersController.deleteCustomer);

router.route('/:id')
    .get(customersController.getCustomer);

module.exports = router;