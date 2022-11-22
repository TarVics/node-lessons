const router = require('express').Router();

const { userController } = require("../controller");
const { userMiddleware } = require('../middleware');

router.get('/', userController.getAll);
router.post('/', userMiddleware.checkEmailUnique, userMiddleware.checkBody, userController.create);
router.delete('/:userId', userMiddleware.checkExists, userController.delete);
router.get('/:userId', userMiddleware.checkExists, userController.getById);
router.put('/:userId', userMiddleware.checkExists, userMiddleware.checkBody, userController.putById);

module.exports = router
