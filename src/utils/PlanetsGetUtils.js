'use strict'

function convertir_a_espanol(planet){
    let planeta = {};
    planeta.nombre = planet.name;
    planeta.periodo_rotacion = planet.rotation_period;
    planeta.periodo_orbital = planet.orbital_period;
    planeta.diametro = planet.diameter;
    planeta.clima = planet.climate;
    planeta.terreno = planet.terrain;
    planeta.aguas_superficiales = planet.surface_water;
    planeta.poblacion = planet.population;
    planeta.fecha_creacion = planet.created;
    planeta.fecha_modificacion = planet.edited;
    planeta.url = planet.url;
    planeta.peliculas = planet.films;
    planeta.residentes = planet.residents;    
    return planeta;
}

async function completar_planeta(planeta, db)
{
    planeta.peliculas = await db.obtener_peliculas(planeta.id);
    planeta.residentes = await db.obtener_residentes(planeta.id);
    return planeta;
}

module.exports = {
    convertir_a_espanol : convertir_a_espanol,
    completar_planeta : completar_planeta
};