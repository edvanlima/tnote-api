var knex = require("../database/connection");

class Funcionarios {


    

    async findId (ID_funcionario){
        try{
       
            var funcionarios = await knex.select().where({ID_funcionario : ID_funcionario}).table("vw_funcionariosProfile").first()        
            return ({status: true, resul: funcionarios})

        } catch(err){
            return ({status: false, resul: err})

        }
        
    }
    async findAllFunc (){
        try{
       
            var funcionarios = await knex.select().table("vw_funcionariosProfile")        
            return funcionarios

        } catch(err){
            return err
        }
        
    }

    async new (ID_funcionario, Nome, flexivel, inativo, ID_horario,ID_empresa,gerente, ID_cliente, ID_Cargo, Codigo_cidade, nivel, ID_projeto){

        try{

            var insere = await knex.insert({ID_funcionario, Nome, flexivel,  inativo, ID_horario,ID_empresa,gerente, ID_cliente, ID_Cargo, Codigo_cidade, nivel, ID_projeto}).table("Funcionario")
            console.log(insere)
            return({status: true})



        }
        catch(error){
            console.log(error)
            return({status: false})
        }

    }

    async update (ID_funcionario, Nome, flexivel, inativo, ID_horario,ID_empresa,gerente, ID_cliente, ID_Cargo, Codigo_cidade, nivel, ID_projeto){
        try{

            var update = await knex.update({Nome, flexivel,  inativo, ID_horario,ID_empresa,gerente, ID_cliente, ID_Cargo, Codigo_cidade, nivel, ID_projeto}).where({ID_funcionario : ID_funcionario}).table("Funcionario");
            console.log(update)
            return({status: true})

        }catch(error){

            console.log(error)

            return({stataus: false})
        }
    }

    async findAllFuncActive (){
        try{
       
            var funcionarios = await knex.select().where({inativo: 0}).table("Funcionario")
            return funcionarios

        } catch(err){
            return err
        }
        
    }

    async findAllCargo(){

        try{
            var cargo = await knex.select().table("cargo")        
            return ({status: true, result : cargo})

        }catch(error){
            return ({status: true, result : error})

        }


    }
    async findAllCidade(){

        try{
            var cargo = await knex.select().table("cidade")        
            return ({status: true, result : cargo})

        }catch(error){
            return ({status: true, result : error})

        }


    }
}

module.exports = new Funcionarios();
