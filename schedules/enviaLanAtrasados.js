const { DATE } = require("mysql2/lib/constants/types");
var knex = require("../database/connection");
const enviaEmail = require("../services/enviaEmail");

class enviaLanAtrasados {




      
    async enviaEmailLancamento(){

      
        console.log('Hello');
        setTimeout(() => { console.log('World!'); }, 80000);
        console.log('Goodbye!');

    

        

     
          
/*
        var result = await knex.select().table("vw_funcionario_atraso_lancamento").then(resultado => {
          // enviaEmail("matheus.mata@tripletech.com.br", "teste", "teste")

          resultado.forEach(element => {
         // setTimeout(async () => await enviaEmail("matheus.mata@tripletech.com.br", "tesste10", "teste10"), 30000)
            console.log(element)
           console.log(Date())
          
          });
       
        });


 */

    }

    
}

module.exports = new enviaLanAtrasados();