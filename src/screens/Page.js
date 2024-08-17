import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from "../assets/images/leyendo-libros.jpeg";
import { FormRegIngEgEmpl } from '../components/FormRegIngEgEmpl';
import { LargeModal } from '../components/LargeModal';
import LoginService from '../services/login.service';

export const Page = () => {
  const {login_token} = LoginService.getCurrentUser();

  return (
    <div className="col-12 text-center" style={{marginBottom: 100}}>
      {!login_token &&
        <div style={{padding: 50}}>
          Si ya tienes una cuenta oprime <Link to={"/login"}>INICIAR SESIÓN</Link>, si deseas registrarte oprime <Link to={"/register"}>REGISTRARME</Link>.
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
