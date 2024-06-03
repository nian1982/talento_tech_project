import { Router } from 'express'
import { pool } from '../database.js'
import * as personasCtrl from '../test_db.js'
import * as productoController from '../controller/productoController.js'


const router = Router();

router.get('/list-products', productoController.getProductos);

router.get('/products-edit/:id', productoController.getProductoById);

router.post('/products-edit', productoController.updateProducto); 

router.get("/products-add",   productoController.createProduct);




export default router;