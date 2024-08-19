import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from "../assets/images/leyendo-libros.jpeg";
import LoginService from '../services/login.service';
import { useSelector } from 'react-redux';

export const Page = () => {
  const token = useSelector((state) => state.user.token);

  return (
    <div className="col-12 text-center" style={{marginBottom: 100}}>
      {!token &&
        <div style={{padding: 50}}>
          Para iniciar sesión en el aplicativo, oprime sobre <Link to={"/login"}>INICIAR SESIÓN</Link>.
        </div>
      }
      <img 
          src={logo}
          alt="Plataforma ENDE"
          className="profile-img-card"
          style={{width: '50%', cursor: 'pointer'}}
      />
    </div>
  )
}
