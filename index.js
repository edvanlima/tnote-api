require("dotenv").config()
var bodyParser = require("body-parser")
var express = require("express")
var app = express()
var router = require("./routes/routes")
var cors = require("cors")
const cronn = require("node-cron")
const { enviaEmailLancamento } = require("./schedules/enviaLanAtrasados")

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(cors())

//cronn.schedule("* * * * *", () => console.log("Executando a tarefa a cada 1 minuto"));

//cronn.schedule("* * * * *", () =>  {  enviaEmailLancamento()});

app.use("/", router)

app.listen(3003, () => {
  console.log("Servidor rodando " + Date())
})
