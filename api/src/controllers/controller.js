const connection = require('../database/connections');

module.exports = {
  // LISTAR (Read)
  async index(req, res) {
    const capelas = await connection('capelas').orderBy('id', 'desc').select('*');
    return res.json(capelas);
  },

  // CRIAR (Create)
  async create(req, res) {
    const { nome, status, responsavel, tipo_urna, detalhes, horario_inicio, horario_fim } = req.body;
    
    await connection('capelas').insert({
      nome, status, responsavel, tipo_urna, detalhes, horario_inicio, horario_fim
    });

    return res.status(201).json({ message: 'Agendamento criado!' });
  },

  // DELETAR (Delete) - NOVO!
  async delete(req, res) {
    const { id } = req.params; // Pega o ID da url
    await connection('capelas').where('id', id).delete();
    return res.status(204).send();
  },

  // ATUALIZAR STATUS (Update) - NOVO!
  async updateStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body; // Pega o novo status

    await connection('capelas').where('id', id).update({ status });
    return res.status(204).send();
  }
};