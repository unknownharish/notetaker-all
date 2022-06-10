import React, { useState } from 'react'
import './displaynotes.css'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'

import {set_title_Body} from '../redux/action'
import {getAllNotes,delAsync} from '../redux/asyncAction';
import { useDispatch ,useSelector} from 'react-redux'
//images
import del from '../images/delete.svg'
import pencil from '../images/pencil-fill.svg'
//components
import { Card,Button } from 'react-bootstrap'


export default function Displaynotes(props) {
    const [dis, setdis] = useState(false)

// console.log(props)
const user = useSelector(x=>x.USER)
    const dispatch = useDispatch();
    return (
        <div className='displaynotes '>
      
            <Card style={{ width: '18rem',marginTop:'1vh',marginBottom:'1.5vh' }}>
                <Card.Body>
                    {/* <Card.Title>{props.user.title?{props}:'Note title'}</Card.Title> */}
                    <Card.Title>{props.user.title}</Card.Title>
                    <Card.Subtitle className="my-3 text-muted">Note</Card.Subtitle>
                    <Card.Text  >
                        <p>

                    {props.user?props.user.body:"note  body"}
                        </p>
                    </Card.Text>

                 <Button variant='warning' className='mx-2 my-1 move' onClick={()=>{
                     props.setuser_edit(true)
                     dispatch(set_title_Body(props.user._id,props.user.title,props.user.body))  // set the title and edit in redux for display
                        

                    }}><img className='move' src={pencil}/></Button>

                    <Button  className='my-1 move' variant='danger' id='del' onClick={()=>{
                        dispatch(set_title_Body(props.user._id,props.user.title,props.user.body))  // set the title and edit in redux for display                                           // set note id first
                        dispatch(delAsync(user.note_id))
                        dispatch(getAllNotes(user._id))

                    }}disabled={dis} ><img className='move'  src={del} alt="" /></Button>
                </Card.Body>
            </Card>

        </div>
    )
}
