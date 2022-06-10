import './home.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Displaynotes from '../displayNotes/Displaynotes';
import Editnote from '../Edit_a_Note/Editnote'


//pagination
import Pagination from '../paginationButtons/Pagination';
import Loader from '../loader/Loader'

//actions
import { resetUser, setUserDetails, setTitle_Body } from '../redux/action'
import { insertAsync, getAllNotes } from '../redux/asyncAction'


//redux matrial

import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

//default images
import defaultuser from '../images/dafault__user.png'
import googleimage from '../images/logo_google.jpeg';

//components
import { Card, Button, Alert, Form } from 'react-bootstrap'


export default function Home({ setuser, addNote, setaddNote }) {


    let navigate = useNavigate();
    let location = useLocation()
    let dispatch = useDispatch();

    const AuthUser = useSelector(x => x.USER)
    //    console.log(AuthUser)
    const [loader, setloader] = useState(0)



    useEffect(async () => {


        async function checkValid() {

            let config = {
                headers: {
                    'Content-Types': 'application/json',
                    'token': localStorage.getItem('token')
                }
            }
            let res = await axios.get('/private', config);


            if (res.data.error) {

                setvalidPage(false)                      // to prevent unnecessary rendering 
                console.log('in home comp use-effect');
                localStorage.removeItem('token')
                dispatch(resetUser());
                navigate('/')                           // redirect to login


            }
            else {
                // console.log('useeffect')
                setvalidPage(true)
                dispatch(setUserDetails(res.data.user))     // add user to global state 
                dispatch(getAllNotes(res.data.user._id))
                setuser(1)

            }
        }
        await checkValid()

    }, [location.pathname]);



    let profileImage = AuthUser.image;
    // console.log(profileImage)

    // async function showImage() {
    //     let image = axios.post()
    // }
    function logoutUser() {
        localStorage.removeItem('token')
        // console.log(localStorage.getItem('token'))
        dispatch(resetUser());
        setuser(0)
        setloader(1)

        setTimeout(() => {

            navigate('/')                           // redirect to login
        }, 500);


    }


    const [alert, setalert] = useState(0);
    const [title, settitle] = useState('');
    const [body, setbody] = useState('');
    const [user_edit, setuser_edit] = useState(false)
    const [validPage, setvalidPage] = useState(false)


    return (< >
        {loader ? <div style={{ 'height': '90vh' }}><Loader /></div> :
            <>
                {validPage ?

                    <div className="main  container">


                        <div className="container col-4 main__info ">

                            <Card >
                                <Card.Img variant="top" referrerpolicy="no-referrer" src={AuthUser.googleUser ? profileImage : `user/image/${AuthUser.image}`} />
                                <hr />
                                <Card.Body>
                                    <Card.Title className='uppercase'> {AuthUser.name === '' ? 'Dummy' : AuthUser.name}</Card.Title>
                                    <Card.Text>
                                        Total Notes : {AuthUser.totalDocuments}
                                    </Card.Text>

                                    <Button onClick={() => { logoutUser() }} title='Logout from this device' variant='danger' >Logout</Button>
                                </Card.Body>
                            </Card>

                        </div>
                        <div class='home col-12 col-xl-8'>


                            {
                                <Pagination />

                            }

                            {alert ?
                                <Alert className='my-3' show={alert} variant="danger">
                                    <Alert.Heading>Error Message !</Alert.Heading>
                                    <p>
                                        The input fileds must be filled
                                    </p>
                                    <hr />
                                    <div className="d-flex justify-content-end">
                                        <Button className='btn-sm' onClick={() => setalert(false)} variant="outline-warning">
                                            Close
                                        </Button>
                                    </div>
                                </Alert> : ''

                            }

                            {addNote ?
                                <div class="home_modal container">

                                    <Form >
                                        <Form.Group className="mb-3 " controlId="title">
                                            <Form.Label className='mt-2'>Note Title</Form.Label>
                                            <Form.Control className='col-6' type="text" placeholder="Enter title" value={title} onChange={(e) => { settitle(e.target.value) }} required />
                                            <Form.Text className="text-muted">
                                                Write an easy title
                                            </Form.Text>
                                        </Form.Group>
                                        <Form.Group className="mb-2 " controlId="text">
                                            <Form.Label className='mt-1 '>Note Text</Form.Label>
                                            {/* <Form.Control type="text" placeholder="Enter title" /> */}
                                            <textarea value={body} onChange={(e) => {
                                                setbody(e.target.value);

                                            }} class="form-control my-1" placeholder="Write some note" id="model_noteText" required />


                                        </Form.Group>

                                        <Button variant='success' className='mt-1' onClick={(e) => {
                                            e.preventDefault();

                                            if (title == '' || body == '') {
                                                setalert(1);
                                                setTimeout(() => {
                                                    setalert(0)
                                                }, 1000);
                                            }
                                            else {

                                                // if data is valid

                                                dispatch(setTitle_Body(title, body))
                                                dispatch(insertAsync(AuthUser._id, title, body))
                                                dispatch(getAllNotes(AuthUser._id))
                                                settitle('');
                                                setbody('')

                                            }

                                        }} > Add Note</Button>
                                        <Button className='mx-2 mt-1' variant='danger' onClick={() => {
                                            setaddNote(0)
                                        }} >Close</Button>
                                    </Form>

                                </div> : ""
                            }


                            {user_edit ? <Editnote setuser_edit={setuser_edit} /> : ''}

                            <div class="noteDisplay">

                                {AuthUser.allNotes.length === 0 ? <div id='empty' style={{ 'width': '149%', 'marginLeft': '50vh' }}> <h4 style={{ 'text-Align': 'center' }}>Add some notes here.. go to header section for add notes</h4></div> :
                                    AuthUser.allNotes.map(x => {
                                        // console.log('mapping', x)
                                        return (

                                            <Displaynotes user={x} setuser_edit={setuser_edit} />
                                        )
                                    })
                                }


                            </div>



                        </div>
                    </div> : <div style={{ 'height': '90vh' }}><Loader /></div>
                } </>}
    </>
    )
}
