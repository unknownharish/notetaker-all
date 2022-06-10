
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from '../src/myComponents/header/Header.js'
import { useState, useEffect } from 'react'
import Home from './myComponents/Home/Home';


import {useDispatch} from 'react-redux'
import { Footer } from './myComponents/footer/Footer';
import Login from './myComponents/login/Login';
import Signup from './myComponents/signup/Signup';








function App() {
  const [click, setclick] = useState(0);
  const [addNote, setaddNote] = useState(0);
  const [editnote, seteditnote] = useState(0);
  const [user, setuser] = useState(false)
  const dispatch = useDispatch();


  



  return (
    <div className="App">

     
      <BrowserRouter>
        <Header user={user} addNote={addNote} setaddNote={setaddNote}/>


        <Routes>
          <Route  path='/' exact={true} element={<Login  addNote={addNote} setaddNote={setaddNote} setuser={setuser} />}/>
          <Route  path='/signup' exact={true} element={<Signup />}/>
          <Route  path='/dashboard' exact={true} element={<Home setuser={setuser} addNote={addNote} setaddNote={setaddNote} editnote={editnote} seteditnote={seteditnote} />} />
        </Routes>
      <Footer/>
      </BrowserRouter>

      

    </div>
  );
}

export default App;
