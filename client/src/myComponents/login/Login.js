
import axios from 'axios';

//actions

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './login.css';

import { useNavigate } from 'react-router-dom';
import Loader from '../loader/Loader';
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script'
import googleimage from '../images/logo_google.jpeg';
import notetaker from '../images/notetaker.jpeg';

//components
import { Alert, Button } from 'react-bootstrap';


export default function Login({ setuser, addNote, setaddNote }) {

    let cId = '395228317137-lbp0opcbfnrp24b42uvk9cote25r6p2i.apps.googleusercontent.com';
    let navigate = useNavigate()

    const [loader, setloader] = useState(0);
    const [show, setShow] = useState(0);
    const [title, settitle] = useState('');
    const [content, setcontent] = useState('')
    const [email, setemail] = useState('')
    const [pass, setpass] = useState('')
    let dispatch = useDispatch();
    let state = useSelector(x => x.USER)


    useEffect(() => {

        // function start(){
        //     gapi.client.init({
        //         clientId:cId,
        //         scope:""
        //     })
        // }

        // gapi.load('client:auth2',start);



        //  dispatch(removeUserLoggedIn())



        if (localStorage.getItem('token')) {
            navigate('/dashboard')
        }




    }, []);



    function handlestate(e) {
        e.target.type == 'email' ? setemail(e.target.value) : setpass(e.target.value)

    }

    async function checkstate() {
        if (email == '' || pass == '') { setShow(1) }

        else {

            setShow(0)
            setloader(1)

            try {



                let { data } = await axios.post('/login/user', {
                    'email': email,
                    'password': pass
                });
                // console.log(data)

                if (!data.error) {
                 
                    localStorage.setItem('token', data.token);
                    navigate('/dashboard')
                }
                else{
                    
                    setloader(0)
                }


            } catch (error) {
alert('invalid login details');
            }


        }

    }

    const responseGoogle = async (response) => {
        // console.log(response);
        const config = {
            'email': response.profileObj.email,
            'name': response.profileObj.name,
            'imageUrl': response.profileObj.imageUrl
        }

        try {


            let res = await axios.post('/google/login', config)

            if (!res.data.error) {

                // console.log(res.data);
                localStorage.setItem('token', res.data.token);
                setuser(1);

                navigate('/dashboard');
            }
        } catch (error) {

            console.log(error)

        }

    }
    const fail = (response) => {
        // console.log(response);
    }




    return (
        <>


            {!loader ?



                <div className="Login row container-fluid ">
                    <div className="container col-12 col-md-6 col-xl-7 ">
                        <img className='image img-fluid' src={notetaker} alt="" />

                    </div>

                    <div className="container outline col-12 col-sm-10 col-md-6  col-lg-5 col-xl-5">
                        <h3>Login or Sign up </h3>
                        <input className=' col-9 col-md-6 col-xl-5 ' onChange={(e) => handlestate(e)} value={email} required title='Enter valid email' placeholder='Enter unique mail' type="email" name="email" id="" />
                        <input className='col-9 col-md-6 col-xl-5' cd onChange={(e) => handlestate(e)} value={pass} required title='Password must be strong in nature' placeholder='Password' type="password" name="password" id="" />
                        <input id='login__button' onClick={() => { checkstate() }} className='col-9 col-md-6 col-xl-5' type="button" value="Login" />



                        <div className="divider col-3">
                            <p>Or</p>
                        </div>


                        <div className="google container">


                            <GoogleLogin
                                clientId={cId}
                                render={renderProps => (
                                    <button onClick={renderProps.onClick} id='login__google' >Login with <img className='mx-2' src={googleimage} alt="" /></button>
                                )}
                                buttonText="Login"
                                onSuccess={responseGoogle}
                                onFailure={fail}
                                cookiePolicy={'single_host_origin'}
                            />



                        </div>

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

                : <div style={{ 'height': '90vh' }}><Loader /></div>}

        </>

    )
}
