const knex = require("../../../database/connection");



class DashboardsFuncionario{

    async buscaExtratoFunc(id_funcionario){

        try{

            var resultado = await knex.select().where({ID_funcionario: id_funcionario}).table("VM_SALDO_FUNCIONARIO").orderBy('ID_periodo', 'desc')

            return({status: true, result : resultado})

        }catch(error){
            console.log(error)
            return({status: false, result : error})
        }
    }


    async buscaLancamento(id_funcionario, data_inicio, data_fim){

        try{
            var query = "exec report_lancamento @FUNCIONARIO = '"+ id_funcionario + "', @Data = '"+ data_inicio +"', @Data1 = '"+ data_fim + "'";

            console.log(query)
            var resultado = await knex.raw(query);

            console.log(resultado)
            return ({status: true, resultado: resultado})

        }catch(error){
            return ({status: false, error: error})
        }


    }


}
module.exports = new DashboardsFuncionario();