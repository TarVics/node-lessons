const ApiError = require("../error/ApiError");

const { IMAGE_MAX_SIZE, IMAGE_MIMETYPES } = require("../config/file-upload.config");

module.exports = {
    checkUploadImage: async (req, res, next) => {
        try {
            if (!req.files) {
                next(new ApiError('No files to upload', 400));
                return;
            }

            const imagesToUpload = Object.values(req.files);

            for (const image of imagesToUpload) {
                const { size, mimetype, name } = image;

                if (size > IMAGE_MAX_SIZE) {
                    next(new ApiError(`File ${name} is too big.`, 400));
                    return;
                }

                if (!IMAGE_MIMETYPES.includes(mimetype)) {
                    next(new ApiError(`File ${name} has invalid format`, 400));
                    return;
                }
            }

            next()
        } catch (e) {
            next(e);
        }
    }
}
