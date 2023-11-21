
var User = require('../models/User');
var PasswordToken = require('../models/PasswordToken');
var bcrypt = require("bcrypt");
var procedure = require('../models/StoreProcedure');

var jwt = require("jsonwebtoken");
const { use } = require('../routes/routes');
session = require("express-session")

var SecreteKey = "vaicurinthians1234";

var EmailSen = require('../services/enviaEmail');
const enviaEmail = require('../services/enviaEmail');
const { create } = require('../models/PasswordToken');


class UserController{



    async testeProcedure(req, res){

        var user = await procedure.procedure_teste();

        if(user){
            res.status(200)
            res.json(user.resultado);
        }else{
            res.status(400);
            res.send("Erro na execução");
        }

    }

    async login (req, res){

        enviaEmail("matheus.mata@tripletech.com.br", "<h1>Teste para envio</h1>", "Envio email")

     var {email, password} = req.body;

       var user = await User.findByEmail(email);

       if(user != undefined){

        console.log(user.password);
        var senha = await bcrypt.compare(password, user.password);

        if(senha){

            var token = jwt.sign({email: user.email, role: user.role}, SecreteKey);
            res.status(200);
            res.json({token: token, email: user.email, role: user.role});

          

        }else{
            res.status(400);
            res.json({error: "Senha invalida"})
        }

         }else{
            res.status(400);
            res.json({error: "usuario nao encontrado"})
         }


    }

    async index(req, res){
        
        var users = await User.findAll();
        res.status(200)
        res.json(users);
    }


    async findUser(req, res){
        var id = req.params.id;
        var user = await User.findById(id);

        if(user == undefined){
            res.status(400);
            res.json({error: "usuario não encontrado"})
        }else{

            res.json(user);
        }
    }

    async create(req, res){
        var {email, name, password} = req.body;

        if(email == undefined){

            res.status(404);
            res.json({error:"email não foi informado"});
            return;
        }

       var emailExist = await User.findEmail(email);
       
        if(emailExist == true){
            res.status(400);
            res.json({error: "Email já cadastrado em nossa base"});
            return;
        }


       await User.new(email, password, name);

       var GeraTokensenha = await create(email)
       
       if(GeraTokensenha.status == true){

        enviaEmail(email, "<h3>Link para gerar senha</h3><br>Para realizar a criação da senha <br>  https://tnote.vercel.app/reset-password/step2?id="+GeraTokensenha.token, "Gerar senha Tnote")
       
    }

       res.status(200);
       res.json({status: "Usuário criado"})


  
    }

    async delete (req, res){
        var id = req.params.id;
        var del = await User.delete(id);

        if(del.status == true){
            res.status(201)
            res.json({status: "Deletado com sucesso."})
        }
        else {
            res.status(400);
            res.json({error: "Não deu certo pode refazer"})
        }

    }

    async edit(req, res){
        var {id, name, role, email} = req.body;

        var result = await User.update(id, email, name, role);

        if(result != undefined){
            if(result.status){
                res.status(200)
                res.send({status: "Atualização realizada com sucesso!!"});

            }else{
                res.status(406);
                res.json(result.err);
            }
        }


    }


    async recoveryPassword(req, res){

        var email = req.body.email;

        if(email == ''){

            res.status(400);
            res.json({error: "Não foi enviado e-mail"})
        }

        //realiza a criação do token
       var result = await PasswordToken.create(email);
    
       console.log(result)

       if(result.status == true){

        var envio = await enviaEmail(email, "<h3>Link para alterar o e-mail </h3><br>Para realizar a alteração da senha basta clicar no link e abaixo <br> tnote.vercel.app/reset-password/step2?id="+result.token, "Alterar Senha Tnote")
        res.status(200);    
        res.json({status: "Email enviado com sucesso"});
   


       }else{
         
            res.status(406);
            res.json({error : "Problema na geração do token"})
       }

    }

    async changePassword (req, res){
        var token = req.query.id;
        var password = req.body.password;

        var isTokenValid = await PasswordToken.validate(token);

        if(isTokenValid.status){
        
           await  User.changePassword(password, isTokenValid.token.user_id, isTokenValid.token.token);
           res.status(200)
           res.json({status: "Senha alterada com sucesso"});


        }else{
            res.status(400)
            res.send({error: "token invalido"})
        }
    }
}

module.exports = new UserController();