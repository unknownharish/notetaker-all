import React, { useState, useEffect } from 'react'
import './editnote.css'
import axios from 'axios'

import { updateAsync, getAsync, skipNotes,getAllNotes } from '../redux/asyncAction'
import {update_title_Body} from '../redux/action'

import { useSelector, useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap';


export default function Editnote({ alert, setalert, setuser_edit }) {



  let user = useSelector(x => x.USER);
  const dispatch = useDispatch();
  let [edittitle, setedittitle] = useState(user.edittitle);
  let [editbody, seteditbody] = useState(user.editbody);

  // useEffect(() => {

  //      setedittitle(data.edittitle);
  //      seteditbody(data.editbody)

  // }, [data]);


  return (
    <div className='editnote my-2'>

      <div class="mb-3 mx-4">
        <label for="title" class="form-label">Title</label>
        <input value={edittitle} onChange={(e) => setedittitle(e.target.value)} type="text" class="form-control" id="title" aria-describedby="emailHelp" />
      </div>

      <div class="mb-3 mx-4">
        <label for="body" class="form-label">Body</label>
        <textarea value={editbody} onChange={(e) => seteditbody(e.target.value)} class="form-control" id="body" />
        <p class='my-1'>Note : For changes Reflected back you have to click on refresh</p>
      </div>


      <div className="editButtons">

        <button onClick={() => {

          if (edittitle == '' || editbody == '') {
            setalert(1);
            setTimeout(() => {
              setalert(0)
            }, 1000);
          }
          else {

         dispatch(update_title_Body(edittitle,editbody))
            dispatch(updateAsync(user.note_id, edittitle, editbody));
            dispatch(getAllNotes(user._id))

            setTimeout(() => {
              setuser_edit(false)

            }, 200);



          }


        }} type="button" class="btn btn-warning">Update It</button>
        <Button className='mx-2 mt-1' variant='danger' onClick={() => {

          setuser_edit(false)
        }} >Close</Button>

      </div>
    </div>
  )
}
