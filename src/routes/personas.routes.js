import { Router } from 'express'
import { pool } from '../database.js'
import * as personasCtrl from '../test_db.js'
import * as personaController from '../controller/personaController.js'

const router = Router();

router.get('/add', (req, res)=>{ res.render('personas/add')});

router.post('/add', personaController.createPerson);

router.get('/list', personaController.getPersonas);

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