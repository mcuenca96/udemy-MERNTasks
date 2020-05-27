import React, { useReducer } from "react";
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";
import clienteAxios from "../../config/axios";
import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION,
} from "../../types";
import authContext from "./authContext";

const AuthState = (props) => {
    const initialState = {
        token: localStorage.getItem("token"),
        autenticado: null,
        usuario: null,
        mensaje: null,
    };

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    const registrarUsuario = async (datos) => {
        try {
            const respuesta = await clienteAxios.post("/api/usuarios", datos);
            console.log(respuesta.data);

            // Obtener el usuario
            usuarioAutenticado();

            dispatch({ type: REGISTRO_EXITOSO, payload: respuesta.data });
        } catch (error) {
            console.log(error);

            const alerta = {
                msg: error.response.data.msg,
                categoria: "alerta-error",
            };
            dispatch({ tpe: REGISTRO_ERROR, payload: alerta });
        }
    };

    // Retorna el usuario autenticado

    const usuarioAutenticado = async () => {
        const token = localStorage.getItem("token");
        if (token) {
            // TODO: Función par enviar el token por headers
            const respuesta = await clienteAxios.get("/api/auth");
        }

        try {
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR,
            });
        }
    };
    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                registrarUsuario,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;
