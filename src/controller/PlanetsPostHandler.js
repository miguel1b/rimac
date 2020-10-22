const db = require('../db/PlanetsPostDb');

module.exports.planets = async (event, context) => {
    let response = {};
    try{
        let body = event.body;
        let fields = [ body.nombre, body.periodo_rotacion, body.periodo_orbital, body.diametro, body.clima, body.gravedad,  body.terreno, body.aguas_superficiales, body.poblacion, body.fecha_creacion, body.fecha_modificacion, body.url];
        let result = await db.registrar_planeta(fields);
        for(let i in body.peliculas)
        {
            console.log(body.peliculas[i]);
            let pelicula = [body.peliculas[i], result.insertId];
            await  db.registrar_peliculas(pelicula);
        }
        for(let i in body.residentes)
        {
            console.log(body.residentes[i]);
            let residente = [body.residentes[i], result.insertId];
            await  db.registrar_Residentes(residente);
        }
       
        response.code = "RETO_TECNICO-000";
        response.message ="La operación se ejecutó con éxito.";
        context.done(null, response);
    }
    catch(error)
    {
        console.log(error);
        response.code = "RETO_TECNICO-500";
        response.message = "Ocurrió un error en la operación.";
        context.done(error);
    }
}