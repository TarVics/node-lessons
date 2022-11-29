const router = require('express').Router();

const {authController} = require("../controller");
const {authMiddleware, userMiddleware} = require("../middleware");

router.post('/login',
    authMiddleware.checkLogin,
    userMiddleware.loadToReq('email'),
    authController.login);

router.post('/refresh', authMiddleware.checkRefreshToken, authController.refresh);

module.exports = router;