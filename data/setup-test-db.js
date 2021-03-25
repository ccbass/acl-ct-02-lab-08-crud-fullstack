const fs = require('fs').promises;

module.exports = (pool) => {
  return fs.readFile(`${__dirname}/../sql/setup-test-db.sql`, { encoding: 'utf-8' })
    .then(sql => pool.query(sql));
};
