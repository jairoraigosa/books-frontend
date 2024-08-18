import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import logo from "../assets/images/leyendo-libros.jpeg";
import LoginService from "../services/login.service";
import Home from "./Home";
import { useDispatch } from 'react-redux';
import { setToken } from "../redux/actions/userActions";
import { useSelector } from 'react-redux';

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" style={{padding: 2}}>
                <strong>¡ERROR!</strong> Este campo es requerido!
            </div>
        );
    }
};


const Login = () => {
  const token = useSelector((state) => state.user.token);
  const form = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if(username.length<3){
        setMessage('El nombre de usuario debe de contener al menos 3 caracteres.');
        setLoading(false);
    }else {
        try {
            const response = await LoginService.login(username, password);
            const data = response.data;
            if(data.trans){
                dispatch(setToken(data.token));
            }else{
                setMessage('Usuario y/o contraseña incorrecta.');
            }
        } catch (error) {
            const resMessage =
                (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString();

            setMessage(resMessage);
        }
        setLoading(false);
    }
  };
  return (
    (!token) ? ( 
        <div className="row" style={{ paddingBottom: 100 }}>
            <div className="col-md-3"></div>
            <div className="col-md-6">
                <div className="text-center">
                    <img 
                        src={logo}
                        alt="Plataforma Books"
                        className="profile-img-card"
                        style={{width: '50%'}}
                    />
                </div>
                <div className="card border" style={{borderRadius: 10}}>
                    <div className="card-header">
                        <h4>
                            INICIAR SESIÓN
                        </h4>
                    </div>
                    <div className="card-body">
                        {message && (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
                                    {message}
                                </div>
                            </div>
                        )}
                        <Form onSubmit={handleLogin} ref={form}>
                            <div className="form-group m-b-10">
                                <label htmlFor="username">Usuario</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    value={username}
                                    onChange={onChangeUsername}
                                    validations={[required]}
                                />
                            </div>

                            <div className="form-group m-b-10">
                                <label htmlFor="password">Contraseña</label>
                                <Input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    value={password}
                                    onChange={onChangePassword}
                                    validations={[required]}
                                />
                            </div>

                            <div className="form-group center">
                                <button className="btn btn-primary btn-block" disabled={loading}>
                                {loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                    Login
                                </button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
            <div className="col-md-3"></div>
        </div>
    ) : (<Home/>)
  );
};
export default Login;
