var knex = require("../database/connection");

class Projetos{

    async findProjetosActive (){

        var resul = await knex.select().table("Projeto")
        return ({status: true, resultado : resul});
    
    }


    async findProjetoId(id_projeto){

        try{


            var resul = await knex.select().where({id_projeto: id_projeto}).table("Projeto").first()

            return ({status: true, resultado : resul});

        }catch(error){
            return ({status: false, resultado : "Error"});

        }



    }


    //insere novo projeto
    async new (Nome , Inicio, Termino, Status , Reembolsavel, ID_Cliente, Spiceworks , GerenteTecnico, ID_projeto_sharepoint, Descricao){
        try{
            var result = await knex.insert({Nome , Inicio, Termino, Status , Reembolsavel, ID_Cliente, Spiceworks , GerenteTecnico, ID_projeto_sharepoint, Descricao}).table("Projeto");
            
            return ({status: true, resul: result});

        } catch(erro){
            return({status: false, resul: "erro na geração do projeto"});
        }

    }


    async listGerenteTec(){

        var result = await knex.select().table("vm_gerenteTec")
        return result

    }

    async update (id_projeto , Nome, Inicio, Termino, Status , Reembolsavel, id_cliente, Spiceworks , GerenteTecnico, ID_projeto_sharepoint, Descricao){
        
        if(id_projeto == '' || id_projeto == undefined){

            return({status: false})        
        }

        var _busca = await knex.select().where({id_projeto : id_projeto}).table("Projeto")
        
        if(_busca == '' || _busca == undefined){

            return({status: false})
        }

        //realiza o update do projeto
        try{

            var resul = await knex("Projeto").where({ID_Projeto : id_projeto}).update({
                Nome : Nome,
                Inicio: Inicio,
                Termino : Termino,
                Status: Status,
                Reembolsavel: Reembolsavel,
                ID_Cliente: id_cliente,
                GerenteTecnico: GerenteTecnico,
                Descricao: Descricao
            })

            return({status: true})
   
        }catch(error){

            console.log(error)
            return({status: false})
        }


    }
    

    
}

module.exports = new Projetos();