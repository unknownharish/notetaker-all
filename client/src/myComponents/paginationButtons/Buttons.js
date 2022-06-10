import React from 'react'
import { skipNotes } from '../redux/asyncAction'
import {useDispatch, useSelector} from 'react-redux'

//image
import refresh from '../images/arrow-clockwise.svg';

export default function Buttons({ no }) {

  let user = useSelector(x=>x.USER)
  const dispatch =  useDispatch();
  return (
  
  <>
   {no ==0?
   <button id={no} onClick={() => {

     dispatch(skipNotes(user._id,no))
    
  }} type="button" class="my-1 mx-1 btn btn-outline-secondary"><img src={refresh} alt="" /></button>:

  <button id={no} onClick={() => {
    dispatch(skipNotes(user._id,no))
    
  }} type="button" class="my-1 mx-1 btn btn-primary">{no+1}</button>
  
  }
    </>
    
  )
}
