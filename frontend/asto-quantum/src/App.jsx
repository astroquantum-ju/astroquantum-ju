import { useEffect } from 'react';
import {  Login, Register, Home } from './components/index';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';


function NavigationHandler(){
  const navigate = useNavigate();
  if(window.location.pathname === '/'){
    useEffect(()=>{
      navigate('/register');
    })
  }
  return null;
}

function App() {
  
  return (
    <>
      <Router>
        {/* <NavigationHandler/> */}
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App