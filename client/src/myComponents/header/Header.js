import React, { useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
import './header.css'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
//images
import video from '../images/logo.svg'
import { useDispatch ,useSelector} from 'react-redux'
//componnets
import { Button } from 'react-bootstrap'


export default function Header({ user, addNote,setaddNote  }) {
    let dispatch = useDispatch();
const [button, setbutton] = useState(0)




    return (
        <div className='header'>

            <ul className='header__tab'>

                <li id='logo'> <img src={video} alt="icon" /> Note Taker</li>

                {user ?
                    <li>
                        <Button variant='outline-success' onClick={() => setaddNote(1)}>Add note</Button>
                    </li> : 
                    <li>
                        <div className="btn btn-danger header__signup "> <Link to="/signup">SignUp </Link> </div>
                    </li>
                }

  
            </ul>
        </div>
    )
}


