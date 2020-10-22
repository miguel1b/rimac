
const services = require('../services/PlanetsGetService');
const db = require("../db/PlanetsGetDb");
const utils = require("../utils/PlanetsGetUtils");

module.exports.planets = async (event, context) => {
    console.log(event);
    const options = {
      hostname: 'swapi.py4e.com',
      port: 443,
      path: '/api/planets/',
      method: 'GET'
    }
    try {
        let result = await db.obtener_planetas();
        console.log(result);
        for(let i in result)
        {
            result[i].peliculas = await db.obtener_peliculas(result[i].id);
            //result[i].residentes = await db.obtener_residentes(result[i].id);
            //result[i] = await utils.completar_planeta(result[i], db);
        }
        console.log("antes del request ");
        let response = await services.httpRequest(options, null);
        console.log("response: "+ JSON.stringify(response));
        
        if(response.results && Array.isArray(response.results))
        {
            for(let i in response.results)
            {
                let data = utils.convertir_a_espanol(response.results[i]);
                console.log(data);
                result.push(data);
            }
        }

        response.code = "RETO_TECNICO-000";
        response.message ="La operación se ejecutó con éxito.";
        response.data = result
        context.done(null, result);
    }
    catch(error)
    {
        console.error(error);
        context.done(error);
    }
};