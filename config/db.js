const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_HOST, { logging: false });

sequelize.authenticate().then(() => {
  console.log('Success!');
}).catch((err) => {
  console.log(err);
});

module.exports = sequelize;
