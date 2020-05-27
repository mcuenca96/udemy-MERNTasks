const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.autenticarUsuario = async (request, response) => {
    // revisar si hay errores

    const errores = validationResult(request);
    if (!errores.isEmpty()) {
        return response.status(400).json({ errores: errores.array() });
    }

    // extraer el mail y password

    const { email, password } = request.body;

    try {
        // Revisar que sea un usuario registrado
        let usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return response.status(400).json({ msg: "El usuario no existe" });
        }
        // Revisar password

        const passCorrecto = await bcryptjs.compare(password, usuario.password);
        if (!passCorrecto) {
            return response.status(400).json({ msg: "Password Incorrecto" });
        }

        // Si todo es correcto crear y firmar el JWT
        const payload = {
            usuario: {
                id: usuario.id,
            },
        };

        // Firmar el JWT
        jwt.sign(
            payload,
            process.env.SECRETA,
            {
                expiresIn: 3600,
            },
            (error, token) => {
                if (error) throw error;
                // Messaje de confirmacion

                response.json({ token });
            }
        );
    } catch (error) {
        console.log(error);
    }
};

//Obitne el usuario autenticado
exports.usuarioAutenticado = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario.id);
        res.json({ usuario });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Hubo un error" });
    }
};
