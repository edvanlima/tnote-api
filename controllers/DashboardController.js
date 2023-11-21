const Dashboards = require("../models/dashboards/Funcionario/Dashboards");


class DashboardController {

async extratoFunc (req, res){
    var id_funcionario  = req.params.id_funcionario
    var extrato = await Dashboards.buscaExtratoFunc(id_funcionario);
    if(extrato.status == true){
        res.status(200);
        res.json(extrato.result)
    }
    else{
        console.log(extrato.error)
        res.status(400);
        res.json({error: "Não foi possivel buscar o extrato do funcionario "+ id_funcionario})
    }
}


async buscaLancamento(req, res){
    var funcionario = req.query.id_funcionario;
    var data_inicio = req.query.datainicio
    var data_fim = req.query.datafim

    var result = await Dashboards.buscaLancamento(funcionario, data_inicio, data_fim)

    if(result.status == true){
        res.status(200);
        res.json(result.resultado)
    }
    else{
        res.status(400);
        res.json(result.error)
    }

}

}


module.exports =  new DashboardController();