const e = require('express');
var Funcionario = require('../models/Funcionarios');
const PasswordToken = require('../models/PasswordToken');
const User = require('../models/User');
const enviaEmail = require('../services/enviaEmail');


class FuncionarioController {



   
async findId (req, res){
     var id_func_param = req.params.id_funcionario

    var func = await Funcionario.findId(id_func_param);
    if(func.status == true){
        res.status(200);
        res.json(func.resul)
    }
    else{
        res.status(400);
        res.json({error: "Não encontrado" })
    }
}
    
async findAll (req, res){

    var func = await Funcionario.findAllFunc();    

    if(func != undefined){
    
        res.json(func);

    }else{
        res.status(400);
        res.json({error: "Não foi possivel buscar os funcionarios"});
    }

    }

    async update(req, res){

        var ID_funcionario = req.params.id_funcionario

        var {Nome, flexivel, inativo, ID_horario,ID_empresa,gerente, ID_cliente, ID_Cargo, Codigo_cidade, nivel, ID_projeto} = req.body

        var resultado = await Funcionario.update(ID_funcionario, Nome, flexivel, inativo, ID_horario,ID_empresa,gerente, ID_cliente, ID_Cargo, Codigo_cidade, nivel, ID_projeto)

        if(resultado.status == true){
            res.status(200);
            res.json({status: "Funcionário atualizado com sucesso!!"});
        }
        else{
            res.status(400);
            res.json({error: "Não foi possivel atualizar  1"})

        }

    }



    async new (req, res){

        var{ID_funcionario, Nome, flexivel, inativo, ID_horario,ID_empresa,gerente, ID_cliente, ID_Cargo, Codigo_cidade, nivel, ID_projeto} = req.body
        
        if(ID_funcionario == '' || ID_funcionario == undefined || Nome == '' || Nome == undefined){

            res.status(400)
            res.send({ error: "Não foi possivel criar funcionario"})

        }else{
            //cria usuario na tabela de funcionario
            var result = await Funcionario.new(ID_funcionario, Nome, flexivel, inativo, ID_horario,ID_empresa,gerente, ID_cliente, ID_Cargo, Codigo_cidade, nivel, ID_projeto)
            //cria usuario na tabela de usuario
            var user_acesso = await User.new(ID_funcionario, 'Password', Nome);
            //gera token para alteração de senha
            var GeraTokensenha = await PasswordToken.create(ID_funcionario);

            if(GeraTokensenha.status == true){

                enviaEmail(ID_funcionario, "<h3>Link para gerar senha</h3><br>Para realizar a criação da senha <br>  https://tnote.vercel.app/reset-password/step2?id="+GeraTokensenha.token, "Gerar senha Tnote")

            }


            if(result.status == true && user_acesso.status == true){
               
                res.status(200);
                res.json({status: "Funcionario inserido com sucesso!!"})
            }
            else{
                res.status(400);
                res.json({status: "Erro ao inserir"})
            }
        }

    }


async findAllActive (req, res){

    var func = await Funcionario.findAllFuncActive();    

    if(func != undefined){
        res.status(200)
        res.json(func);

    }else{
        res.status(400);
        res.json({error: "Não foi possivel buscar os funcionarios"});
    }

    }


    async CargoFunc (req, res){

        var resultado = await Funcionario.findAllCargo();

        if(resultado.status == true){
            res.status(200);
            res.json(resultado.result)
        }
        else{
            res.status(400);
            res.json(resultado.result)
        }
    }


    async CidadeFunc (req, res){

        var resultado = await Funcionario.findAllCidade();

        if(resultado.status == true){
            res.status(200);
            res.json(resultado.result)
        }
        else{
            res.status(400);
            res.json(resultado.result)
        }
    }
}




module.exports = new FuncionarioController();
