import { Router } from 'express'
import { pool } from '../database.js'
import * as personasCtrl from '../test_db.js'
import * as productoController from '../controller/productoController.js'


const router = Router();

router.get('/list-products', productoController.getProductos);

export default router;