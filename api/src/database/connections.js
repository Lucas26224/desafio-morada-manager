const knex = require('knex');
const path = require('path');

const connection = knex({
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, 'db.sqlite'),
  },
  useNullAsDefault: true,
});

connection.schema.hasTable('capelas').then(exists => {
  if (!exists) {
    return connection.schema.createTable('capelas', table => {
      table.increments('id').primary();
      table.string('nome').notNullable(); // Nome da Sala (Ex: Sala 01)
      table.string('status').notNullable();
      table.string('responsavel');
      table.string('tipo_urna');
      table.text('detalhes');
      
      // NOVOS CAMPOS DE HORÁRIO
      table.string('horario_inicio');
      table.string('horario_fim');
    });
  }
});

module.exports = connection;