import Task from "../models/Task.js";

const listar_task = async (req, res) => {
    const tasks = await Task.findAll();
    res.json({
        tasks
    });
};

const crear_task = async (req, res) => {
    const {
        tittle,
        description
    } = req.body;
    const task = await Task.create({
        tittle,
        description
    });
    res.json({
        msg: "Task creada",
    });
};

const actualizar_task = async (req, res) => {
    const {
        tittle,
        description
    } = req.body;
    const {
        id
    } = req.params;
    const task = await Task.update({
        tittle,
        description
    }, {
        where: {
            id
        }
    });
    res.json({
        msg: "Task actualizada",
    });
};

const eliminar_task = async (req, res) => {
    const {
        id
    } = req.params;
    const task = await Task.destroy({
        where: {
            id
        }
    });
    res.json({
        msg: "Task eliminada",
    });
};

const task_by_id = async (req, res) => {
    const {
        id
    } = req.params;
    const task = await Task.findOne({
        where: {
            id
        }
    });
    res.json({
        task
    });
};

export {
    listar_task,
    crear_task,
    actualizar_task,
    eliminar_task,
    task_by_id
}; 