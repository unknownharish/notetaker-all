
import './signup.css'
import { useState, useEffect } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import axios from 'axios'

import signupimage from '../images/signup.jpeg'

//component
import { Alert, Button } from 'react-bootstrap'
import Loader from '../loader/Loader'

export default function Signup() {


  let navigate = useNavigate()

    // const [image, setimage] = useState('');
    const [loading, setloading] = useState(false)
    const [show, setShow] = useState(0);
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('')
    const [email, setemail] = useState('')

    useEffect(() => {

                    
        
        if (localStorage.getItem('token')) {
            navigate('/dashboard')
        }


    }, []);

    async function showww() {

        if (username == '' || password == '' || document.getElementById('userimage').value == '' || email == '') {
            setShow(1)
        }
        else 
        {     setloading(true)
            // setimage(document.getElementById('userimage').files[0])
            let formdata = new FormData();

            formdata.append('email', email);
            formdata.append('name', username);
            formdata.append('password', password);
            formdata.append('file', document.getElementById('userimage').files[0]);
           
        
            setShow(0)
            try {
                let { data } = await axios.post('/user/signup', formdata)

                // console.log(data)

                if(!data.error){
                    setloading(false)
                    localStorage.setItem('token', data.token);

                    navigate('/dashboard');

                }
                else{
                    setloading(false)
                }


            } catch (error) {
                // console.log(error)
            }

        }
    }

    return (
        <>
        {
            !loading? <div>

          
    
        <div className="row container-fluid my-4 ">
            <div className="signup__image  col-12 col-md-6  col-xl-7" >
                <img src={signupimage} className='img-fluid' />
            </div>
            <div className='container-fluid col-10 col-sm-7 col-md-5 signup  col-lg-4 col-xl-3'>

                <h3>Create an Account </h3>
                {/* <form action="http://localhost:4000/user/signup" method="post" > */}

                <div class="input-group mb-3 ">
                    <span class="input-group-text" >Username</span>
                    <input required type="email" name='email' id="username" onChange={(e)=>setemail(e.target.value)} class="form-control" placeholder="Your Email" aria-label="Username" aria-describedby="username" />
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" id='name1' >Name</span>
                    <input required type="text" id="name" name='name' onChange={(e)=>setusername(e.target.value)} class="form-control" placeholder="Your Name" aria-label="Name" aria-describedby="Name" />
                </div>


                <div class="input-group mb-3">
                    <span class="input-group-text" >Password</span>
                    <input required type="password" id="password" name='password' onChange={(e)=>setpassword(e.target.value)} class="form-control" placeholder="Password" aria-describedby="Password" />
                </div>

                <label htmlfor="basic-url" class="form-label">Your Image</label>
                <div class="input-group mb-3">
                    <input required type="file" name='file' class="form-control" id="userimage" aria-describedby="userimage" />
                </div>
                <Button className="btn btn-success my-2" type='submit' onClick={() => { showww() }} >Register</Button>

                <Link to='/'><div className="btn btn-secondary mx-3 my-2">Login</div> </Link>
                {/* </form> */}


                {show ?

                    <Alert className='my-3' variant="warning">
                        <Alert.Heading>Error Message !</Alert.Heading>
                        <p>
                            The input fileds must be filled before continue..
                        </p>
                        <hr />
                        <div className="d-flex justify-content-end">
                            <Button className='btn-sm' onClick={() => setShow(0)} variant="outline-danger">
                                Close
                            </Button>
                        </div>
                    </Alert>


                    : ''}


            </div>


        </div>
        </div>: <div style={{'min-height':'100vh'}}>  <Loader/> </div>
        }
    </>
    )
}

