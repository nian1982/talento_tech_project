import { Router } from 'express'
import { pool } from '../database.js'
import * as personasCtrl from '../test_db.js'
import * as categoriaController from '../controller/categoriaController.js'

const router = Router();

// router.get('/add', (req, res)=>{ res.render('categorias/add')});

// router.post('/add', personaController.createPerson);

router.get('/list-categories', categoriaController.getCategorias);

router.get('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params
        await pool.query('DELETE FROM personas WHERE id = ?', [id]);
        res.redirect('/list');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/edit', (req, res)=>{
    res.render('personas/edit')
});

export default router;