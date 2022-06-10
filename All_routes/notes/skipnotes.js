const { Note } = require('../../mongoDB/notesSchema');

exports.skip = async(req, res, next) => {

    let { _id, no } = req.params;

    try {

        let data = await Note.find({ 'userId': _id }).sort({ $natural: -1 }).skip(6 * no).limit(6);
        let totalDocument = await Note.find({ 'userId': _id }).count();
        res.json({
            'data': data,
            "totalDocument": totalDocument,

            'error': false
        });
        next();

    } catch (error) {
        console.log(error);
        res.json({
            'error': true
        })
        next();
    }




}