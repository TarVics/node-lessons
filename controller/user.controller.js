const {userService/*, oauthService*/} = require("../service");
const {User} = require("../database");
const {S3Service} = require("../service");

module.exports = {
    create: async (req, res, next) => {
        try {
            // const hashPassword = await oauthService.hashPassword(req.body.password);
            // const user = await userService.create({...req.body, password: hashPassword});
            const user = await User.createWithHashPassword(req.body);

            res.status(201).json(user);
        } catch (e) {
            next(e)
        }
    },

    readAll: async (req, res, next) => {
        try {
            const users = await userService.readAll();
            res.json(users);
        } catch (e) {
            next(e)
        }
    },

    readFromReq: async (req, res, next) => {
        try {
            // req.user.testMethod();
            // req.user.comparePasswords();
            // console.log('-----------------------------');
            // User.testStatic();
            // User.createUserWithHashPassword();


            res.json(req.user);
        } catch (e) {
            next(e)
        }
    },

    update: async (req, res, next) => {
        try {
            const userInfo = req.body;
            const {userId} = req.params;

            const user = await userService.update(userId, userInfo);

            res.json(user);
        } catch (e) {
            next(e)
        }
    },

    delete: async (req, res, next) => {
        try {
            const {userId} = req.params;
            await userService.delete(userId);

            res.status(204).send('done');
        } catch (e) {
            next(e)
        }
    },

    uploadAvatar: async (req, res, next) => {
        try {
            // Save to local file

            const path = require('node:path');
            console.log(req.files.avatar);

            const ext = path.extname(req.files.avatar.name);
            const uploadPath = path.join(process.cwd(), 'static', `${Date.now()}${ext}`);

            req.files.avatar.mv(uploadPath, (err) => {
                if (err) {
                    throw err
                }
            });

            res.json('ok');

/*
            // Save to S3
            const uploadedData = await s3Service.uploadPublicFile(req.files.avatar, 'user', req.user._id);
            const updatedUser = await User.findByIdAndUpdate(req.user._id, {avatar: uploadedData.Location}, {new: true});
            res.json(updatedUser);
*/
        } catch (e) {
            next(e);
        }
    }

}