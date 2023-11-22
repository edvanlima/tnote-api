var knex = require("../database/connection")
const winston = require("winston")

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "combined.log" }),
  ],
})

class Cliente {
  async findAllClient() {
    try {
      logger.info("Buscar clientes")
      var result = await knex.select().table("Cliente")
      logger.info("Resultado: " + result)
      return result
    } catch (err) {
      console.log(err)

      return []
    }
  }

  async buscaClienteID(id_cliente) {
    try {
      var result = await knex
        .select()
        .where({ id_cliente: id_cliente })
        .table("Cliente")
        .first()
      return { status: true, resultado: result }
    } catch (err) {
      return []
    }
  }

  async new(Nome, Ativo, ID_sharepoint, ID_funcionario, last_update) {
    if (Nome == "" || Nome == undefined) {
      return { status: false }
    }

    try {
      var result = await knex
        .insert({ Nome, Ativo, ID_sharepoint, ID_funcionario, last_update })
        .table("Cliente")
      return { status: true }
    } catch (err) {
      return { status: false, err: err }
    }
  }

  async update(id_cliente, Nome, Ativo) {
    if (id_cliente == "" || id_cliente == undefined) {
      return { status: false }
    }

    if (Nome == "" || Nome == undefined) {
      return { status: false }
    }

    var _busca = await knex.select().table("Cliente").where({
      ID_Cliente: id_cliente,
    })

    if (_busca == undefined || _busca == "") {
      return { status: false }
    }

    try {
      var resul = await knex("Cliente")
        .where({ ID_Cliente: id_cliente })
        .update({
          Nome: Nome,
          Ativo: Ativo,
        })

      return { status: true }
    } catch (err) {
      console.log(err)
      return { status: false }
    }
  }
}

module.exports = new Cliente()
