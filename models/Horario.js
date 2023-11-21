const knex = require("../database/connection");

class Horario{


    async ListHorarios (){


        try{
            var resultado = await knex.select().table("horario")
    
            return({status: true, result: resultado})

        }catch(error){
            return(error)

        }       

    }


}

module.exports = new Horario();