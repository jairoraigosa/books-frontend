import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import LoginService from "./services/login.service";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./screens/Login";
import Register from "./screens/Register";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./screens/Home";
import { Page } from "./screens/Page";
import './assets/css/estilos.css'



function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const {login_token} = LoginService.getCurrentUser();
  useEffect(() => {
    const user = LoginService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    LoginService.logout();
    setCurrentUser(null);
    navigate("/login");
  };

  return (
    <div style={{minHeight: 500}}>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        {login_token 
          ? <Navbar/>
          : <Link to={"/"} className="navbar-brand">
            Bienvenido a la plataforma donde podrás tener un historial de los libros leidos y por leer
          </Link>
        }
        <div className="navbar-nav w100 right">
          <li className="nav-item">
            {currentUser && (
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
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/home" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}
export default App;
