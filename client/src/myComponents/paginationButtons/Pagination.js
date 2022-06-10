import React from 'react'
import './pagination.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import {useDispatch,useSelector} from 'react-redux'
import Buttons from './Buttons';

import {skipNotes} from '../redux/asyncAction';

export default function Pagination() {

    let dispatch =useDispatch();
    const Notes = useSelector(x=>x.USER);
    let totalPage = [parseInt(Notes.totalDocuments/7)+1];
    let btns  = [...Array(parseInt(totalPage))];
    // console.log(btns);
  

    
  return (
    <div className='totalpage'>
      {
         
        btns.map((_,x)=>{

          return <Buttons no={x}/>
        })
      
      }

    </div>
  )
}
