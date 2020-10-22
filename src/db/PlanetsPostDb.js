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

async function registrar_planeta(planeta){
    try {
        let query = "INSERT INTO PLANETA (nombre, periodo_rotacion , periodo_orbital, diametro, clima, gravedad, terreno, aguas_superficiales, poblacion, fecha_creacion, fecha_modificacion, url) VALUES (?,?,?,?,?,?,?,?,?,?,?,?);";
        //let query = "INSERT INTO Planetas (nombre, periodo_rotacion , periodo_orbital, diametro, clima, terreno, aguas_superficiales, poblacion, fecha_creacion, fecha_modificacion, url) VALUES (?,?,?,?,?,?,?,?,?,?,?);";
        //let query = "CALL SP_REGISTRAR_PLANETAS(?,?,?,?,?,?,?,?,?,?,?,?);";
        let stm = mysql.format(query, planeta);
        const [results] = await pool.query(stm);
        return results;
    } catch (error) {
        throw new Error("Error al registrar planeta en la base de datos");
    }
}

async function registrar_peliculas(params){
    try {
        let query = "INSERT INTO PELICULA (url, Planetas_idPlanetas) VALUES (?,?);";
        //let query = "CALL SP_REGISTRAR_PELICULA(?,?);";
        let stm = mysql.format(query, params);
        const [results] = await pool.query(stm);
        return results;
    } catch (error) {
        throw new Error("Error al registrar película en la base de datos");
    }
}

async function registrar_Residentes(params){
    try {
        let query = "INSERT INTO RESIDENTE (url, Planetas_idPlanetas) VALUES (?,?);";
        //let query = "CALL SP_REGISTRAR_RESIDENTE(?,?);";
        let stm = mysql.format(query, params);
        const [results] = await pool.query(stm);
        return results;
    } catch (error) {
        throw new Error("Error al registrar residente en la base de datos");
    }
}

module.exports = {
    registrar_planeta : registrar_planeta,
    registrar_peliculas: registrar_peliculas,
    registrar_Residentes: registrar_Residentes
};