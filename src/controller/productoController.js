import { pool } from '../database.js';

export const getProductosPorCategoria = async (req, res) => {
    try {
        const { categoria } = req.params;

        // const categoria = 'Peliculas';

        const resultQuery = await pool.query("SELECT * FROM productos INNER JOIN categorias ON productos.categoria_id = categorias.id WHERE categorias.nombre = $1", [categoria]);

        res.render('productos/peliculasView', { productos: resultQuery.rows });
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({ message: error.message });
    }
};


export const getProductos = async (req, res) => {
    try {
        // const resultQuery = await pool.query("SELECT * FROM productos join categorias on categorias.id = productos.categoria_id");
        const resultQuery = await pool.query(`
            SELECT 
                productos.id, productos.nombre AS producto_nombre, 
                productos.descripcion, 
                productos.activo, 
                categorias.nombre AS categoria_nombre 
            FROM productos 
            JOIN categorias ON categorias.id = productos.categoria_id
        `);
        res.render('productos/productosList', { productos: resultQuery.rows });
        console.log('productos/productosList = '+resultQuery.rows); // Para depuración
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ message: error.message });
    }
};


export const getProductoById = async (req, res) => {
    try {
        const { id } = req.params;
        // const resultQuery = await pool.query("SELECT * FROM productos WHERE id = $1", [id]);

        const resultQuery = await pool.query(`
            SELECT 
                productos.id,
                productos.nombre, 
                productos.descripcion, 
                productos.activo, 
                categorias.id AS categoria_nombre 
            FROM productos 
            JOIN categorias ON categorias.id = productos.categoria_id
            WHERE productos.id = $1`, [id]);

        const producto = resultQuery.rows[0];

        

        res.render('productos/productEdit', { producto });
    } catch (error) {
        console.error("Error al obtener el producto:", error);
        res.status(500).json({ message: error.message });
    }
};



export const updateProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, activo, categoria_id } = req.body;
        await pool.query(
            "UPDATE productos SET nombre = $1, descripcion = $2, activo = $3, categoria_id = $4 WHERE id = $5",
            [nombre, descripcion, activo === 'on', categoria_id, id]
        );

        res.redirect('/list-products');
    } catch (error) {
        console.error("Error al actualizar el producto:", error);
        res.status(500).json({ message: error.message });
    }
};


export const getAddProduct =  (req, res) => {
    res.render('productos/productAdd')
};

export const createProduct = async (req, res) => {
    try {
        const { nombre, descripcion, categoria_id, image } = req.body;

        const resultQuery = await pool.query(
            "INSERT INTO productos (nombre, descripcion, categoria_id, image) VALUES ($1, $2, $3, $4) RETURNING *", 
            [nombre, descripcion, categoria_id, image]
        );

        res.redirect('/list-products');
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({ message: error.message });
    }
};



// // Eliminar un producto
// export const deleteProducto = async (req, res) => {
//     try {
//         const { id } = req.params;

//         const resultQuery = await pool.query("DELETE FROM productos WHERE id = $1 RETURNING *", [id]);

//         res.redirect('/productos');
//     } catch (error) {
//         console.error("Error: ", error);
//         res.status(500).json({ message: error.message });
//     }
// };


