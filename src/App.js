import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import LoginService from "./services/login.service";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./screens/Login";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./screens/Home";
import { Page } from "./screens/Page";
import './assets/css/estilos.css'
import { useSelector } from 'react-redux';
import { logoutUser, setToken } from "./redux/actions/userActions";
import { useDispatch } from 'react-redux';


function App() {
  const token = useSelector((state) => state.user.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const getToken = async () => {
      const tokenStorage = await LoginService.getCurrentUser();
      if(tokenStorage){
        dispatch(setToken(tokenStorage));
      }
    }
    getToken();
  }, [dispatch])
  

  const logOut = () => {
    LoginService.logout();
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <div style={{minHeight: 500}}>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        {token 
          ? <Navbar/>
          : <Link to={"/"} className="navbar-brand">
            Bienvenido a la plataforma donde podrás tener un historial de los libros leidos y por leer
          </Link>
        }
        <div className="navbar-nav w100 right">
          <li className="nav-item">
            {token && (
              <button
                className="btn btn-link"
                onClick={logOut}
              >Logout</button>
            )}
          </li>
        </div>
      </nav>
      <div className="container mt-3">
        <Routes>
          <Route exact path="/" element={<Page />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/home" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}
export default App;
