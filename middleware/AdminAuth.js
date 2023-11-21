
var jwt = require("jsonwebtoken");
var SecreteKey = "vaicurinthians1234";
                  

module.exports = function(req, res, next){

    console.log(req.headers);
    const authToken = req.headers['authorization']
    console.log("token >>>> " + authToken);


    if(authToken != undefined){
        const bearer = authToken.split(' ');
        var token = bearer[1];

        try{


            console.log("token gerado para validação "  + token)
            var decoded = jwt.verify(token, SecreteKey);
            
            console.log("decode status " + decoded.role)
            //verifica a role do usuário
            if(decoded.role >= 1){
           
                console.log(">>>>> >>sessao" + decoded.role)
             
                next();
            }
            else{
                res.status(403);
                res.json({status:"Não possui acesso a esse modulo"});
                return; 
            }
        
        }catch(err){

            console.log("token error " + err)
            res.status(403);
            res.json({status: "Token inválido"});
            return; 
        }
 

    }else {

        res.status(403);
        res.json({status: "Você não está autenticado"});
        return;  
    }


}


