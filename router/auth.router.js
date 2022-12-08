const router = require('express').Router();

const {authController} = require("../controller");
const {authMiddleware, userMiddleware} = require("../middleware");

router.post('/login',
    authMiddleware.checkLogin,
    userMiddleware.loadToReq('email'),
    authController.login);

router.post('/refresh', authMiddleware.checkRefreshToken, authController.refresh);
router.post('/logout', authMiddleware.checkAccessToken, authController.logout);
router.post('/logoutall', authMiddleware.checkAccessToken, authController.logoutAll);


router.post('/password/forgot', userMiddleware.loadToReq('email'), authController.forgotPassword);
router.put('/password/forgot', authMiddleware.checkActionToken, authController.setPasswordAfterForgot);

module.exports = router;