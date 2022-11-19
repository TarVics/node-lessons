const router = require('express').Router();

const { carController } = require("../controller");
const { carMiddleware } = require('../middleware');

router.get('/', carController.getAll);
router.post('/', carMiddleware.checkBody, carController.create);
router.delete('/:carId', carMiddleware.checkExists, carController.delete);
router.get('/:carId', carMiddleware.checkExists, carController.getById);
router.put('/:carId', carMiddleware.checkExists, carMiddleware.checkBody,  carController.putById);

module.exports = router
