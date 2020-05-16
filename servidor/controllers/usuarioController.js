const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.crearUsuario = async (request, response) => {
    //revisar si hay errores
    const errores = validationResult(request);
    if (!errores.isEmpty()) {
        return response.status(400).json({ errores: errores.array() });
    }

    // extraer mail y password
    const { email, password } = request.body;

    try {
        // Revisar que el usuario registrado sea unico
        let usuario = await Usuario.findOne({ email });

        if (usuario) {
            return response.status(400).json({ msg: "El usuario ya existe" });
        }
        // crea el nuevo usuario
        usuario = new Usuario(request.body);

        // Hashear password
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password, salt);

        // guardar usuario
        await usuario.save();

        // crear y firmar el JWT
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
        response.status(400).send("Hubo un error");
    }
};
