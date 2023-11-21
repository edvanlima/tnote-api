var knex = require("../database/connection");
var session = require("express-session")

class HoraProjeto{


    async new(id_funcionario, id_projeto, horaInicio, horaFim, km, refeicao, estacionamento, outros, ticket, valorHora, valorKM, descricao, iD_lancamento_sharepoint){
        
        if(id_funcionario == '' ){
            return ({status: false, err: "Id funcionario não foi passado"})    
        }


        // valida se o ticket ja foi lançando
        var result = await knex.raw("SELECT * FROM horas_projeto where horaInicio between CAST('"+  horaInicio + "' as datetime2) and CAST('"+  horaFim + "' as datetime2)  and id_funcionario = '"+id_funcionario+"'");
        
        console.log(result.length)

        if(result.length > 0){

            return ({status: false})
        }

        try{
            await knex.insert({id_funcionario, id_projeto, horaInicio, horaFim, km, refeicao, estacionamento, outros, ticket, valorHora, valorKM, descricao, iD_lancamento_sharepoint}).table("horas_projeto");
            return ({status: true});

        }catch(err){

            return({status: false, err: err});

        }
    
    }

    

    async find_id(id_lancamento){
        
        console.log("id_lancamento find" + id_lancamento)

        var busca_id = await knex.select().where({id_lancamento : id_lancamento}).table("vm_horas_projeto_front").orderBy('dia', 'desc').first()
        
        return busca_id

    
    }


    async duplicar(id_horas_projeto) {

        var id = await knex.select().where({id_lancamento: id_horas_projeto}).table("horas_projeto");

        if(id.length > 0){
            try{
                console.log("estrou >>>")

                var query = "exec proc_duplica_chamado @id_lancamento = " + id_horas_projeto;
                
                var result = await knex.raw(query);

                console.log(result);

                return({status:true})

            }catch(err){

                console.log(err)
                return({status: false, err: err});
            }

        }else{


            return({status: false, err: "não foi possive duplicar o chamado"})
        }

    }


    async EditLancamento(id_lancamento, id_projeto, horaInicio, horaFim, km, refeicao, estacionamento, outros, ticket, valorHora, valorKM, descricao, iD_lancamento_sharepoint){

        if(id_lancamento == ''){
            return({status: false})
        }
        console.log("passou " + id_lancamento)
        try{
            /*
            var query = "UPDATE horas_projeto SET id_projeto = " + id_projeto + " WHERE id_lancamento = " + id_lancamento
            var result = await knex.raw(query);
            */
            
          var result = await knex("horas_projeto").where({"ID_lancamento" : id_lancamento}).update({
                id_projeto: id_projeto,
                
                horaInicio: horaInicio,
                horaFim: horaFim,
                km: km,
                refeicao: refeicao, 
                estacionamento: estacionamento,
                outros: outros,
                descricao: descricao
                
            })

            
            console.log("resultado  >>> " + result)
            return ({status: true})

        }catch(err){
            console.log(err)
            return ({status: false})
        }




    }


    async findHPFunc(id_funcionario){
   

        console.log("id_funcionario" + id_funcionario)
        if(id_funcionario != ''){
            try{
                var horas_projeto_fun = await knex.select().where({id_funcionario: id_funcionario}).table("vm_horas_projeto_front").orderBy('dia', 'desc')
                
 
                console.log(horas_projeto_fun);
              
                return horas_projeto_fun
              


            }catch(err){
                return ({status: false});
            }
        }
       
    }


}


module.exports = new HoraProjeto();