import { pool } from '../database.js';

// export const getNavBar = async (req, res, next) => {
//     try {
//       const result = await pool.query('SELECT nombre FROM categorias');
  
//       const categorias = result.rows.map(row => row.nombre);
//       console.log("Categorias metodo = "+categorias);
  
//       res.locals.categorias = categorias;
  
//       next(); // Continúa con el siguiente middleware
//     } catch (error) {
//       // Maneja el error
//       next(error);
//     }
//   };

export const getNavBar = async (req, res) => {
    try {
        const resultQuery = await pool.query("SELECT * FROM categorias");
        const categorias = resultQuery.rows;

        // Imprimir los datos de la respuesta en la consola del servidor
        console.log("Datos de categorias main:", categorias);

        res.render('index', { categorias });
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({ message: error.message });
    }
};

export const loadCategories = async (req, res, next) => {
    try {
        const resultQuery = await pool.query("SELECT * FROM categorias");
        res.locals.categorias = resultQuery.rows;
        console.log("Datos de categorias:", res.locals.categorias); // Para depuración
        next();
    } catch (error) {
        console.error("Error al cargar las categorías:", error);
        next(error);
    }
};



// import { pool } from '../database.js';

// export const getNavBar = async (req, res) => {
//     try {
//         const resultQuery = await pool.query("SELECT * FROM categorias");
//         const categorias = resultQuery.rows;

//         res.render('index', { categorias });
//     } catch (error) {
//         console.error("Error: ", error);
//         res.status(500).json({ message: error.message });
//     }
// };
