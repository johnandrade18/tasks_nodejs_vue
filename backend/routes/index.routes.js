import express from "express";
const router = express.Router();

import {listar_task,crear_task,actualizar_task,eliminar_task,task_by_id} from '../controllers/traskController.js'

router.get("/", listar_task);

router.get("/:id", task_by_id);

router.post('/', crear_task);

router.put('/:id', actualizar_task);

router.delete('/:id', eliminar_task);

export default router;