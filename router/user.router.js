const router = require('express').Router();

const {userController} = require("../controller");
const {userMiddleware, authMiddleware} = require("../middleware");
const {checkUploadImage} = require("../middleware/file.middleware");

router.get('/',
    userController.readAll);

router.post('/',
    userMiddleware.checkCreate,
    userMiddleware.checkEmailUnique,
    userController.create);

router.get('/:userId',
    userMiddleware.checkUserId,
    authMiddleware.checkAccessToken,
    userMiddleware.loadToReq('userId', 'params', '_id'),
    userController.readFromReq);

router.put('/:userId',
    userMiddleware.checkUserId,
    userMiddleware.checkUpdate,
    authMiddleware.checkAccessToken,
    userMiddleware.loadToReq('userId', 'params', '_id'),
    userController.update);

router.delete('/:userId',
    userMiddleware.checkUserId,
    authMiddleware.checkAccessToken,
    userController.delete);

router.patch(
    '/:userId/avatar',
    checkUploadImage,
    userMiddleware.checkUserId,
    userMiddleware.loadToReq('userId', 'params', '_id'),
    userController.uploadAvatar
);

module.exports = router;