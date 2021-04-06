const env = process.env;

const config = {
  db: {
    host: env.DB_HOST || 'localhost',
    user: env.DB_USER || 'root',
    password: env.DB_PASSWORD || 'abcde',
    database: env.DB_NAME || 'Datos',
  },
  listPerPage: env.LIST_PER_PAGE || 100,
};
  
module.exports = config;
