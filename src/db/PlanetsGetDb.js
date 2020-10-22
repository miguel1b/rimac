var mysql = require('mysql2/promise');

var pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    multipleStatements: true,
    queueLimit: 0,
    connectTimeout: 10000
});

async function obtener_planetas(){
    try {
        //let query = "SELECT idPlanetas as id, nombre, periodo_rotacion , periodo_orbital, diametro, clima, gravedad, terreno, aguas_superficiales, poblacion, fecha_creacion, fecha_modificacion, url FROM PLANETA;";
        let query = "select idPlanetas as id, nombre, periodo_rotacion , periodo_orbital, diametro, clima, terreno, aguas_superficiales, poblacion, fecha_creacion, fecha_modificacion, url from PLANETA;";
        // let query = "CALL SP_OBTENER_PLANETAS();";
        const [rows, fields] = await pool.query(query);
        return rows;
    } catch (error) {
        throw new Error("Error al obtener planetas de la base de datos");
    }
}

async function obtener_planeta(id_planeta){
    try {
        let query = "select idPlanetas as id, nombre, periodo_rotacion , periodo_orbital, diametro, clima, terreno, aguas_superficiales, poblacion, fecha_creacion, fecha_modificacion, url from PLANETA WHERE idPlanetas = "+id_planeta+";";
        // let query = "CALL SP_OBTENER_PLANETA(?)";
        // const [rows, fields] = await pool.query(query, id_planeta);
        const [rows, fields] = await pool.query(query);
        return rows;
    } catch (error) {
        throw new Error("Error al obtener planetas de la base de datos");
    }
}

async function obtener_residentes(id_planeta){
    try {
        let query = "select url from RESIDENTE WHERE Planetas_idPlanetas = "+id_planeta+";";
        // let query = "CALL SP_OBTENER_RESIDENTE(?)";
        // const [rows, fields] = await pool.query(query, id_planeta);
        const [rows, fields] = await pool.query(query);
        return rows;
    } catch (error) {
        throw new Error("Error al obtener residentes de la base de datos");
    }
}

async function obtener_peliculas(id_planeta){
    try {
        let query = "select url from PELICULA WHERE Planetas_idPlanetas = "+id_planeta+";";
        // let query = "CALL SP_OBTENER_PELICULA(?)";
        // const [rows, fields] = await pool.query(query, id_planeta);
        const [rows, fields] = await pool.query(query);
        return rows;
    } catch (error) {
        throw new Error("Error al obtener pelicúlas de la base de datos");
    }
}

module.exports = {
    obtener_planetas : obtener_planetas,
    obtener_planeta: obtener_planeta,
    obtener_residentes: obtener_residentes,
    obtener_peliculas: obtener_peliculas
};