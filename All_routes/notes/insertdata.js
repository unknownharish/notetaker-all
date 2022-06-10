const { Note } = require('../../mongoDB/notesSchema');

exports.insertdata = async function(req, res, next) {

    let { title, body } = req.body;
    let _id = req.params._id

    if (!title || !body || !_id) {
        res.json({ error: true });
        next();
    }
    try {

        let data = new Note({ 'userId': _id, title, body });
        await data.save();

        // let data = await schema.insertMany({ title, body });
        data ? res.json({ error: false, 'notes': data }) : '';
        next();

    } catch (error) {
        console.log(error);
        res.json({ error: true });
        next();
    }

}