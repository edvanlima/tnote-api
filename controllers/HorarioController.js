const Horario = require("../models/Horario")

class HorarioController{


async index(req, res){

    var resultado = await Horario.ListHorarios();
    
    if(resultado.status == true){
        res.status(200);
        
        res.json(resultado.result)
        
    }

    else{
        res.send(400);
        res.json({error: "Não foi possivel buscar os horarios"})
    }
}

}

module.exports= new HorarioController()