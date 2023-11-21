var knex = require("../database/connection");

class StoreProcedure{

    
    async procedure_teste(){

        try{

            var nome = "Matheus";
            var sobrenome = "Mata"

            var command = "exec teste_api @LastName="+ nome + ", @FirstName=" + sobrenome;

            var result = await knex.raw(command);

            return({status: true, resultado: result})

        }catch(err){

            return({status:false})
        }



    }
   

}

module.exports = new StoreProcedure();

