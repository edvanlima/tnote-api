horasProjeto = require('../models/HoraProjeto')
var jwt = require("jsonwebtoken");
const HoraProjeto = require('../models/HoraProjeto');
var SecreteKey = "vaicurinthians1234";
var session = require('express-session')
var  DATE_DIFF = require("date-diff-js");


class HorasProjetoController {


    async duplicar(req, res){

        var id_horas_projeto = req.params.id_horas_projeto;
        
        if(id_horas_projeto != ''){
            
            var result = await HoraProjeto.duplicar(id_horas_projeto);
            console.log("entrouuu"  + id_horas_projeto)
            console.log(result)
            if(result.status == true){
                res.status(200)
                res.json({status: "Duplicado com sucesso!"})
            }else{
                res.status(400);
                res.json({error: result.err});
            }

        }else{
            res.status(400);
            res.json({error: "Necessário informar o id"});   
        }   
    }


    async find_id (req, res){

        var id_lancamento  = req.params.id_lancamento
        
        if(id_lancamento == ''){
            res.status(400)
            res.json({error: "Necessário passar o lançamento"})
        }


        try{
            var resul = await HoraProjeto.find_id(id_lancamento)
            res.status(200)
            res.json(resul)


        }catch(erro){
            console.log(erro)
            res.status(400)
            res.send()

        }
      



    }

    async updateLancamento(req, res){

        var id_lancamento = req.params.id_lancamento;
        var {id_projeto, horaInicio, horaFim, km, refeicao, estacionamento, outros, ticket, valorHora, valorKM, descricao, iD_lancamento_sharepoint} = req.body;

        console.log("ticket " + id_lancamento)

        if(id_lancamento ==''){
            res.status(400);
            res.json({error: "Erro ao inserir"})
        }


        
        try{

            var result = await HoraProjeto.EditLancamento(id_lancamento, id_projeto, horaInicio, horaFim, km, refeicao, estacionamento, outros, ticket, valorHora, valorKM, descricao, iD_lancamento_sharepoint)

            console.log("resultao >>>>> " + result)
            if(result.status == true){
                res.status(200);
                res.json({status:"Ticket atualizado com sucesso!!"})
            }else{

            
                res.status(400);
                res.json({error: "Erro ao atualizazr ticket"})
            }

        }catch(err){
            res.status(400);
            res.send()
        }



    }


    async insereHorasProjeto(req, res){


        
        var {id_funcionario, id_projeto, horaInicio, horaFim, km, refeicao, estacionamento, outros, ticket, valorHora, valorKM, descricao, iD_lancamento_sharepoint} = req.body;
 
        /*
        if(dateDiff.output > 8){

            res.status(400);
            res.json({error: "Não foi possivel realizar o lançamento pois o ticket tem mais de 8 horas"})
        }
        */


        var  diffDays = DATE_DIFF(horaInicio, horaFim, 'H')

        if(diffDays.output > 8){
            res.status(400).json({error: "O ticket não deve ter mais de 8 horas"})
        }
    
        if(id_funcionario == '' || id_funcionario == undefined || id_funcionario == null){
            res.status(400).json({error: "Erro id_funcionario null"})
        }
      
        if(id_projeto == '' || id_projeto == undefined || id_projeto == null){
            res.status(400);
            res.json({error: "erro id_projeto null"})
        }


        try{

           

            var resul = await horasProjeto.new(id_funcionario, id_projeto, horaInicio, horaFim, km, refeicao, estacionamento, outros, ticket, valorHora, valorKM, descricao, iD_lancamento_sharepoint);
            if(resul.status == true){
                res.status(200);
                res.json({status:"sucesso!"});
            }else{
                res.status(400);
                res.json({status: "error", error: "Já existe lançamento com essa data"})
            }
                
            
      

        }catch(err){

            res.status(400);
            res.send();

        }
    
    }


    async horasProjetoRetroativo(req, res){


    }


    async indexHoraProjet(req, res){


        
    
    var id_funcionario = req.params.id_funcionario

       console.log(id_funcionario)

        if(id_funcionario == undefined){
            console.log("Entrou")
            res.status(400);
            res.json({error: "Não possui ID do funcionario"});
            
        }

       
        var resul = await horasProjeto.findHPFunc(id_funcionario);
        if(resul != undefined){
            try{
                res.status(200);
                res.json(resul);

            }catch(err){
                res.status(400)
               res.send()
            }
        }


    }
}

module.exports = new HorasProjetoController();