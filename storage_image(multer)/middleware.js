const path = require('path');
const crypto = require('crypto');
const multer = require('multer')
const { GridFsStorage } = require('multer-gridfs-storage');
require('dotenv').config({ path: '../config.env' })


let storage = new GridFsStorage({
    url: process.env.multer,

    file: async(req, file, next) => {

        try {

            // debug
            // console.log('in upload middleware imagename' + file)

            if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {

                let image_name = await crypto.randomBytes(10).toString("hex") + path.extname(file.originalname);

                let fileInfo = {
                    filename: image_name,
                    bucketName: 'uploads',

                };

                return fileInfo;
                // next()

            }
        } catch (error) {

            console.log(error);

        }


    }
});


exports.upload = multer({
    storage,
    // limits: {
    //     // fileSize: 100 // 100 kb
    // }
})