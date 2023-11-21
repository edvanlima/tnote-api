const { default: knex } = require("knex");
const { RegisterSlave } = require("mysql2/lib/commands");
const HoraProjeto = require("../models/HoraProjeto");
const Projetos = require("../models/Projetos");

class ProjetosController{

    async findAllActive (req, res){

        try{
            var resul = await Projetos.findProjetosActive();
           
            if(resul.status == true){
                res.status(200);
                res.json(resul.resultado)
            }else{
                res.status(400);
                res.json({error: "Nao encontrado"})
                return
                
            }

        }catch(err){
            res.status(400);
            res.json({error: "Não foi possivel buscar todos os projetos"});
            return
        }
    }

    async findProjetoId(req, res){

        var id_projeto = req.params.id_projeto

        console.log(id_projeto)
        var resultado = await Projetos.findProjetoId(id_projeto)

        if(resultado.status == true){

        

            res.status(200)
            res.json(resultado.resultado)

        }else{
            res.status(400)
            res.json({status: "error"})
        }
    }

    async create (req, res){
        var{Nome , Inicio, Termino, Status , Reembolsavel, ID_Cliente, Spiceworks , GerenteTecnico, ID_projeto_sharepoint, Descricao} = req.body;


        if(Nome == '' || Descricao == ''){
            res.status(400);
            res.json({error: "Nome é obrigatório"});
        }


    var resul = await Projetos.new(Nome , Inicio, Termino, Status , Reembolsavel, ID_Cliente, Spiceworks , GerenteTecnico, ID_projeto_sharepoint, Descricao);
    
    console.log("projeto resultado >>>>" + resul.resul);


    if(resul.status == true){
        res.status(200)
        res.json({status: "Projeto criado com sucesso!!!"})
    }
    else{
        res.status(400);
        res.json({erro: resul.resul});
    }
}

  
    async listGerenteTec (req, res){
        
        try{
            var resultado = await Projetos.listGerenteTec();
            res.status(200)
            res.json(resultado)
        }catch(error){

        res.status(400)
        res.json({status: "error"})
        }

    }

    async update (req, res){

        var{Nome, Inicio, Termino, Status , Reembolsavel, id_cliente, Spiceworks , GerenteTecnico, ID_projeto_sharepoint, Descricao} = req.body
        var id_projeto = req.params.id_projeto

        if(id_projeto == '' || id_projeto == undefined){

            res.status(400);
            res.json({error: "Erro ao atualizar o lançamento"})
        }

        try{

            var result = await Projetos.update(id_projeto, Nome, Inicio, Termino, Status , Reembolsavel, id_cliente, Spiceworks , GerenteTecnico, ID_projeto_sharepoint, Descricao);
            
            if(result.status==true){
                res.status(200)
                res.json({status: "Projeto atualizado com sucesso.!"})
            }
            else{
                res.status(400)
                res.json({error: "Erro ao atualizar o projeto.!"})
            }

        }catch(err){

            res.status(400);
            res.json({error: "Erro ao atualizar o projeto.!"})
        }





    }

    
    



}

module.exports = new ProjetosController();