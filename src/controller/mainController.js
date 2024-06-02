import { pool } from '../database.js';

export const getNavBar = async (req, res) => {
    try {
        const resultQuery = await pool.query("SELECT * FROM categorias");
        const categorias = resultQuery.rows;

        res.render('index', { categorias });
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({ message: error.message });
    }
};
