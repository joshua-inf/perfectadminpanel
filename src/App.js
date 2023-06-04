import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { Home } from './pages/Home';
import './App.css'
import Login from './pages/login';
import { useContext, useState } from 'react';
import AuthContext from './pages/inside/context/AuthProvider';

function App() {
  const { setAuth, auth } = useContext(AuthContext)
  
  return (
    <BrowserRouter>
    {auth ? 
    <Home/>
    :
    <Login/>
  }
    </BrowserRouter>
  );
}

export default App;
