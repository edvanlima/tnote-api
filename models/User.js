var knex = require("../database/connection");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

var SecreteKey = "vaicurinthians1234";

class User{

    async delete (id){

        var user = await this.findById(id);

        if(user != undefined){
           
            try{
                await knex.delete().where({id: id}).table("users");
                return{status: true}

            }catch(err){

                return {status: false, err: "erro na deleção."}
            }
        }else{
                return {status: false, err : "O usuário não existe"}
        }
    }

    async update(id, email, name, role){
      var userExists =  await this.findById(id);
      
      if(userExists != undefined){
        var editeUser = {};
        if(email != undefined){
            if(email != userExists.email){
              var result = await this.findEmail(email);
                if(result == false) {
                    editeUser.email = email;
                }
                else {
                    return {status: false, err: "O email ja esta cadastrado"}
                }
            }
        }

        if(name != undefined)
            {
                editeUser.name = name;
            }
        if(role != undefined)
            {
                editeUser.role = role;
            }
           try{
                await knex.update(editeUser).where({id: id}).table("users");
                return {status: true}
           }catch(err){

                return {status: false, err}
           } 
      }
      
      else{
        return {status: false, err: "O usuario não existe"}

      }

    }

    async findAll(){
        try{
            var result = await knex.select(["id", "name", "email", "role"]).table("users");
            return result;
        }
        catch(err){
            return[];
        }
    }

    async findById (id){
        try{
            var result = await knex.select(["id", "name", "email", "role"]).where({id: id}).table("users");
                if(result.length > 0){
                    return result[0];
                }else{
                    return undefined;
                }
            }
        catch(err){
            return [];
        }
    } 


    async new(email, password, name){
        try{
           var hash =  await bcrypt.hash(password, 10);
            await knex.insert({email, password: hash, name, role: 1}).table("users");
        }
        catch(err){
            console.log(err);
        }    
    }

    async findByEmail (email){
        try{
            console.log("email findemail === > " + email)
            
            var result = await knex.select(["id", "name", "password", "email", "role"]).where({email: email}).table("users");
                
                if(result.length > 0){

                    return result[0];

                }else{

                    return undefined;
                }
            }
        catch(err){
            return [];
        }
    } 

// metodo só para verificar se existe 
    async findEmail(email){
        try{
          var result = await knex.select("*").from("users").where({email: email});
          console.log(result);
         
          if(result.length > 0){
            return true;
          }else{
            return false;
          }

        }catch(erro){
            console.log(err);
            return false;
        }
    }

    
    async changePassword(newPassword, id, token){

        var hash =  await bcrypt.hash(newPassword, 10);

        await knex.update({password: hash}).where({id: id}).table("users");
        await knex.update({used: 1}).where({id: id}).where({token: token}).table("passwordtoken");

    }

    
}

module.exports = new User();