import React, { useContext, useState, useEffect } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

const FormTarea = () => {
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    const tareasContext = useContext(tareaContext);
    const {
        errortarea,
        tareaseleccionada,
        validarTarea,
        obtenerTareas,
        agregarTarea,
        actualizarTarea,
        limpiarTarea,
    } = tareasContext;

    // Effect que detecta si hay tarea seleccionada

    useEffect(() => {
        if (tareaseleccionada !== null) {
            setTarea(tareaseleccionada);
        } else {
            setTarea({
                nombre: "",
            });
        }
    }, [tareaseleccionada]);

    // State del formulario

    const [tarea, setTarea] = useState({
        nombre: "",
    });

    const { nombre } = tarea;

    if (!proyecto) return null;

    const [proyectoActual] = proyecto;

    // Leer los balores del formulario

    const handleChange = (e) => {
        setTarea({
            ...tarea,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        //validar
        if (nombre.trim() === "") {
            validarTarea();
            return;
        }

        // Si es edición o si es nueva tarea

        if (tareaseleccionada === null) {
            //pasar la validación
            //agregar la nueva tarea al state de tareas
            tarea.proyectoId = proyectoActual.id;
            tarea.estado = false;
            agregarTarea(tarea);
        } else {
            //actualizar tarea
            actualizarTarea(tarea);

            // elimina tareaseleccionada
            limpiarTarea();
        }

        // Obtener y filtrar las tareas del proyecto
        obtenerTareas(proyectoActual.id);

        //reiniciar el form
        setTarea({
            nombre: "",
        });
    };

    return (
        <div className="formulario" onSubmit={onSubmit}>
            <form>
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea"
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>
                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={
                            tareaseleccionada ? "Editar Tarea" : "Agregar Tarea"
                        }
                    />
                </div>
            </form>
            {errortarea ? (
                <p className="mensaje error">
                    El nombre de la tarea es obligatorio
                </p>
            ) : null}
        </div>
    );
};

export default FormTarea;
