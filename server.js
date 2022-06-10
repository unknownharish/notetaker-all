const express = require('express');
require('dotenv').config({ path: './config.env' });
const path = require('path');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');





const { middleware, private } = require('./All_routes/private/private')



const { connect } = require('./mongoDB/connect');
connect();





const app = express();

//middleware 
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride('_method'))

//   ---- LOGIN ROUTES -----

app.use('/note', require('./Routes_handler/notes'));

//signup auth
app.use('/user', require('./Routes_handler/authentication'))

//normal login auth
app.use('/login', require('./Routes_handler/login'))

//google auth  signup and login here 
app.use('/google', require('./Routes_handler/googleRoutes'))


//private route
app.get('/private', middleware, private);
// app.post('/user/p', (req, res) => {
//     console.log(req)
// });


// ----NOTES ROUTES---
app.use('/api', require('./Routes_handler/notes'))

// grid related stuff  and it is necessary to write here

const Grid = require('gridfs-stream');
const mongoose = require('mongoose');

let gfs;
let girdfsbucket;

//for connecting grid fs for multer 
const connectMulter = async() => {

    var conn = mongoose.createConnection(process.env.multer, (err) => {
        !err ? console.log('db connected ') : console.log(err);
    });

    conn.once('open', () => {

        // for stream data in out from database
        girdfsbucket = new mongoose.mongo.GridFSBucket(conn.db, {
            bucketName: 'uploads'
        });

        gfs = Grid(conn.db, mongoose.mongo);

        //collection name where the files are stored
        gfs.collection('uploads');

        // all set!
    })



}


connectMulter();




// to get file info

app.get('/user/image/:name', (req, res) => {

    try {
        gfs.files.findOne({ filename: req.params.name }, async(err, file) => {

            if (!file) {
                res.status(500).json({
                    file: 'no file found'
                })

            } else {
                const readstream = girdfsbucket.openDownloadStream(file._id);
                // console.log(readstream)
                readstream.pipe(res);

            }

        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: 'server error'
        })
    }


})

// delete the upload image

app.delete('/user/image/delete/:name', (req, res) => {

    gfs.files.remove({ 'filename': req.params['name'] }, (err, file) => {

        if (!file) {

            res.status(500).json({
                error: 'server error'
            })
        }


        console.log(file);
        res.status(200).json({
            response: file
        })

    })
})

if (process.env.NODE_ENV == 'production') {

    app.use(express.static(path.join(__dirname, '/client/build')));

    app.get('*', (req, res) => {

        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    })
} else {

    app.get('/', (req, res) => {

        res.send("server is running")
    })
}


app.listen(process.env.PORT, (err) => {
    err ? console.log(err) : console.log('server running at port ' + process.env.PORT);
})