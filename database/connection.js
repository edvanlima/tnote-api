var knex = require('knex')({
    client: 'mssql',
    connection: {
      server : 'samanta.database.windows.net',
      user : 'tripletech',
      password : 'Tr1pl3tech',
      database : 'TNote',
      port: 1433,
      options: {
        encrypt: true
      }
    }
  });

module.exports = knex