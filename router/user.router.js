const router = require('express').Router();

const {userController} = require("../controller");
const {userMiddleware} = require("../middleware");

router.get('/',
    userController.readAll);

router.post('/',
    userMiddleware.checkCreate,
    userMiddleware.checkEmailUnique,
    userController.create);

router.get('/:userId',
    userMiddleware.checkUserId,
    userMiddleware.loadToReq('userId', 'params', '_id'),
    userController.readFromReq);

router.put('/:userId',
    userMiddleware.checkUserId,
    userMiddleware.checkUpdate,
    userMiddleware.loadToReq('userId', 'params', '_id'),
    userController.update);

router.delete('/:userId',
    userMiddleware.checkUserId,
    userController.delete);

module.exports = router;