var knex = require("../database/connection");
var User = require("./User")
var jwt = require("jsonwebtoken");

class PasswordToken{

    async create(email){

        var _user = await User.findByEmail(email);
   
    
        if(_user != undefined ){

            try{


               
                var token = jwt.sign({email: _user.email}, "TokenChange");
                await knex.insert({
                    user_id: _user.id,
                    used: 0,
                    token: token
                }).table("passwordtoken");
                
                return ({status: true, token: token})

            } catch(err){
                console.log(err);
                console.log("token de recuperacao "+ token)
                return ({status: false, error: "Problema para gerar o token"})
            }
            
        }else{
            return {status: false , err : "Email não encontrado"}
        }

    }

    async validate(token){

    try{
        var result = await knex.select().where({token: token, used: 0}).table("passwordtoken");

        if(result.length > 0){

            var tk = result[0];

            return {status: true, token: tk}

        }else{

            console.log(err)
            return({status: false, error: "não encontrado o token validador"})
        }

    }catch(err){
        return ({status: false, error: "erro ao validar token"})

    }
       

    }


}

module.exports = new PasswordToken();