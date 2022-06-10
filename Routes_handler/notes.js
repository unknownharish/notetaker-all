const express = require('express');
const router = express.Router();

const { getAlldata } = require('../All_routes/notes/getAlldata');
const { insertdata } = require('../All_routes/notes/insertdata');
const { updateData } = require('../All_routes/notes/updatedata');
const { deleteData } = require('../All_routes/notes/deletadata');
const { skip } = require('../All_routes/notes/skipnotes')


//for notes 
router.route('/get/:_id').get(getAlldata);
router.route('/insert/:_id').post(insertdata);
router.route('/update/:_id').put(updateData);
router.route('/delete/:_id').delete(deleteData);
router.route('/skip/:_id/:no').get(skip)








module.exports = router;