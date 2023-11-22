const Cliente = require("../models/Cliente")

class ClienteController {
  async findClient(req, res) {
    try {
      const result = await Cliente.findAllClient()
      return res.status(200).json(result)
    } catch (error) {
      return res.status(400).json({ error: "Problema para buscar os clientes" })
    }
  }

  async findClienteId(req, res) {
    var idCliente = req.params.id_cliente

    var resultado = await Cliente.buscaClienteID(idCliente)

    if (resultado.status == true) {
      if (resultado.resultado.length <= 0) {
        res.status(400)
        res.json({ error: "Não foi possivel encontrar o cliente" })
        return
      }
      res.status(200)
      res.json(resultado.resultado)
    } else {
      res.status(400)
      res.send(json({ status: "error", error: "erro ao buscar o cliente" }))
    }
  }

  async create(req, res) {
    var { Nome, Ativo, ID_sharepoint, ID_funcionario, last_update } = req.body
    var result = await Cliente.new(
      Nome,
      Ativo,
      ID_sharepoint,
      ID_funcionario,
      last_update
    )

    if (result.status) {
      res.status(202)
      res.json({ status: "Cliente cadastrado com sucesso!!" })
    } else {
      res.status(400)
      res.json({ error: "Não foi possivel cadastrar o cliente" })
    }
  }

  async update(req, res) {
    var id_cliente = req.params.id_cliente
    var { Nome, Ativo } = req.body

    if (id_cliente == "" || undefined) {
      res.status(400)
      res.json({ error: "Erro ao atualizar cliente!" })
    } else {
      var result = await Cliente.update(id_cliente, Nome, Ativo)

      if (result.status == true) {
        res.status(201)
        res.json({ status: "Cliente atualizado com sucesso!" })
      } else {
        res.status(400)
        res.json({ error: "Erro ao atualizar cliente!" })
      }
    }
  }
}

module.exports = new ClienteController()
