class HomeController{

    async index(req, res){
        res.send("TT Construindo a primeira API");
    }

}

module.exports = new HomeController();