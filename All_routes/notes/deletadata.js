const { Note } = require('../../mongoDB/notesSchema');

exports.deleteData = async function(req, res, next) {

    let _id = req.params._id;
    // console.log('in delete request ' + _id);

    if (!_id) {
        res.json({ error: true });
        next();
    } else {
        try {

            let data = await Note.deleteOne({ _id });
            data ? res.json({ error: false, 'deleted': data }) : res.json({ error: false, 'deleted': 'no record found' })
            next();


        } catch (error) {
            console.log(error);
            res.json({ error: true });
            next();

        }





    }

}