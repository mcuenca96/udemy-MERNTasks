import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
    //State para iniciar sesión
    const [usuario, setUsuario] = useState({
        email: "",
        password: "",
    });

    const { email, password } = usuario;

    const onChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value,
        });
    };

    // Cuando el usuario quiere iniciar sesión

    const onSubmit = (e) => {
        e.preventDefault();

        // Validar que no haya campos vacios

        //Pasarlo al action
    };

    return (
        <div className="form-usuario">
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar Sesión</h1>

                <form onSubmit={onSubmit}>
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Tu email"
                            value={email}
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Pasword</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            placeholder="Tu Password"
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <input
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Iniciar Sesión"
                        />
                    </div>
                </form>
                <Link to={"/nueva-cuenta"} className="enlace-cuenta">
                    Obtener Cuenta
                </Link>
            </div>
        </div>
    );
};

export default Login;
