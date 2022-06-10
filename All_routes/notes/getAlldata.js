const { Note } = require('../../mongoDB/notesSchema');
const jwt = require('jsonwebtoken')

exports.getAlldata = async function(req, res, next) {

    let _id = req.params._id;
    let token = req.params.token;

    try {

        let data = await Note.find({ 'userId': _id }).sort({ $natural: -1 }).limit(6)
        let totalDocument = await Note.find({ 'userId': _id }).count();

        data ? res.json({ error: false, notes: data, "totalDocument": totalDocument }) : res.json({ error: true, data: null });
    } catch (error) {

        console.log(error);
        res.json({
            'error': true
        })

        next();

    }

}