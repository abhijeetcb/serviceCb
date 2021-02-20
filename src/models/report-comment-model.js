const dbConnection = require('../../config/db');

const ReportComment = dbConnection.define('Report_Comment', {
  testReportId: {
    type: dbConnection.Sequelize.INTEGER,
  },
  doctorId: {
    type: dbConnection.Sequelize.INTEGER,
  },
  comment: {
    type: dbConnection.Sequelize.STRING,
  },
  isActive: {
    type: dbConnection.Sequelize.BOOLEAN,
    defaultValue: true,
  },
  isDeleted: {
    type: dbConnection.Sequelize.BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamps: true,
});
ReportComment.sync({ force: true });
module.exports = ReportComment;
