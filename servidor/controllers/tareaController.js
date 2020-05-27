const Tarea = require("../models/Tarea");
const Proyecto = require("../models/Proyecto");
const { validationResult } = require("express-validator");

// Crea una nueva tarea
exports.crearTareas = async (req, res) => {
    // Revisar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    try {
        // Extraer proyecto
        const { proyecto } = req.body;

        const existeProyecto = await Proyecto.findById(proyecto);

        if (!existeProyecto) {
            return res.status(400).json({ msg: "Proyecto no encontrado" });
        }

        if (existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({ msg: "No Autorizado" });
        }

        // Creamos la tarea

        const tarea = new Tarea(req.body);
        await tarea.save();
        res.json({ tarea });

        // Revisar si el proyecto actual pertenece al usuario
    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error");
    }
};

//Obtiene las tareas por proyecto

exports.obtenerTareas = async (req, res) => {
    try {
        // Extraer proyecto

        const { proyecto } = req.body;
        const existeProyecto = await Proyecto.findById(proyecto);

        if (!existeProyecto) {
            return res.status(400).json({ msg: "Proyecto no encontrado" });
        }

        if (existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({ msg: "No Autorizado" });
        }

        // Obtener tareas por proyecto

        const tareas = await Tarea.find({ proyecto });
        res.json({ tareas });

        // Revisar si el proyecto actual pertenece al usuario
    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error");
    }
};

exports.actualizarTareas = async (req, res) => {
    try {
        // Extraer proyecto

        const { proyecto, nombre, estado } = req.body;

        // Si la tarea existe

        let tarea = await Tarea.findById(req.params.id);

        if (!tarea) {
            return res
                .status(404)
                .json({ msg: "No se ha encontrado la tarea" });
        }

        // extraer proyecto
        const existeProyecto = await Proyecto.findById(proyecto);

        if (existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({ msg: "No Autorizado" });
        }

        // Crear objeto con la nueva información

        // Actualizar tarea
        const nuevaTarea = {};

        if (nombre) nuevaTarea.nombre = nombre;
        if (estado) nuevaTarea.estado = estado;

        // Guardar la tarea
        tarea = await Tarea.findOneAndUpdate(
            { _id: req.params.id },
            nuevaTarea,
            { new: true }
        );
        res.json({ tarea });
        // Revisar si el proyecto actual pertenece al usuario
    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error");
    }
};

exports.eliminarTareas = async (req, res) => {
    try {
        // Extraer proyecto

        const { proyecto } = req.body;

        // Si la tarea existe

        let tarea = await Tarea.findById(req.params.id);

        if (!tarea) {
            return res
                .status(404)
                .json({ msg: "No se ha encontrado la tarea" });
        }

        // extraer proyecto
        const existeProyecto = await Proyecto.findById(proyecto);

        if (existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({ msg: "No Autorizado" });
        }

        // Eliminar

        await Tarea.findOneAndRemove({ _id: req.params.id });
        res.json({ msg: "Tarea eliminada" });
    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error");
    }
};
