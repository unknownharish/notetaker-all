const { Note } = require('../../mongoDB/notesSchema');

exports.updateData = async function(req, res) {

    let _id = req.params._id
    let { title, body } = req.body;


    if (!_id || !body || !title) {
        res.json({ error: true });
    }

    try {

        let data = await Note.updateOne({ _id }, {
            $set: { 'title': title, 'body': body }
        });




        data ?
            res.json({
                error: false,
                'updatedNotes': data
            }) : ''


    } catch (error) {
        console.log(error);
        res.json({ error: error });


    }
}