const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("postgres://janani:janani2021@report.cmfnjrzpxm2b.ap-south-1.rds.amazonaws.com/report", { logging: false });

sequelize.authenticate().then(() => {
  console.log('Success!');
}).catch((err) => {
  console.log(err);
});

module.exports = sequelize;
