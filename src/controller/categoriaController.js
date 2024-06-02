import { pool } from '../database.js'

export const getCategorias = async (req, res) => {
    try {
        const resultQuery = await pool.query("select * from categorias");
        res.render('categorias/listCategorias', { categorias: resultQuery.rows })
        // console.log(resultQuery.rows);
    } catch (error) {
        console.log("error: ",error);
    }
};

// export const createPerson = async (req, res) => {
//     try {
//         const {name, lastname, age} = req.body;
//         const newPerson = {name, lastname, age};
//         console.log(newPerson);

//         const resultQuery = await pool.query("insert into personas (name, lastname, age) values ($1, $2, $3);", [name, lastname, age]);
//         res.redirect('/list')
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };



// getPersonas();