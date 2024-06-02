import { Router } from 'express';
import * as peliculasController from '../controller/productoController.js'; 
import multer from "multer";

const router = Router();

router.get('/list/:categoria', peliculasController.getProductosPorCategoria);

export default router;




