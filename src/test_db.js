import { pool } from './database.js';

export const getPersonas = async (req, res) => {
    try {
        const resultQuery = await pool.query("select * from categorias");
        // res.render('personas/list', { personas: resultQuery.rows })
        console.log(resultQuery.rows);
    } catch (error) {
        console.log("error: ",error);
    }
};

export const getProductosPorCategoria = async (req, res) => {
    try {
        const categoria = 'Peliculas';

        const resultQuery = await pool.query("SELECT * FROM productos INNER JOIN categorias ON productos.categoria_id = categorias.id WHERE categorias.nombre = $1", [categoria]);


        console.log(resultQuery.rows);
    } catch (error) {
        console.error("Error: ", error);
    }
};


getPersonas();
// getProductosPorCategoria();