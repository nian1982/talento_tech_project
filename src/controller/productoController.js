import { pool } from '../database.js';

export const getProductosPorCategoria = async (req, res) => {
    try {
        const { categoria } = req.params;

        // Realizar un join con la tabla de categorías para obtener el ID de la categoría
        const resultQuery = await pool.query("SELECT * FROM productos INNER JOIN categorias ON productos.categoria_id = categorias.id WHERE categorias.nombre = $1", [categoria]);

        res.render('productos/view', { productos: resultQuery.rows });
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({ message: error.message });
    }
};





// // Crear un nuevo producto
// export const createProducto = async (req, res) => {
//     try {
//         const { nombre, descripcion, precio, imagen } = req.body;
//         const newProducto = { nombre, descripcion, precio, imagen };

//         const resultQuery = await pool.query(
//             "INSERT INTO productos (nombre, descripcion, precio, imagen) VALUES ($1, $2, $3, $4) RETURNING *", 
//             [nombre, descripcion, precio, imagen]
//         );

//         res.redirect('/productos');
//     } catch (error) {
//         console.error("Error: ", error);
//         res.status(500).json({ message: error.message });
//     }
// };

// // Actualizar un producto
// export const updateProducto = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { nombre, descripcion, precio, imagen } = req.body;

//         const resultQuery = await pool.query(
//             "UPDATE productos SET nombre = $1, descripcion = $2, precio = $3, imagen = $4 WHERE id = $5 RETURNING *", 
//             [nombre, descripcion, precio, imagen, id]
//         );

//         res.redirect('/productos');
//     } catch (error) {
//         console.error("Error: ", error);
//         res.status(500).json({ message: error.message });
//     }
// };

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


