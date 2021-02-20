const dbConnection = require('../../config/db');

const TestReport = dbConnection.define('Test_Report', {
  prescriptionTestId: {
    type: dbConnection.Sequelize.INTEGER,
  },
  // linked to S3 bucket(not in use for initial stage)
  testReport: {
    type: dbConnection.Sequelize.STRING,
  },
  reportDataRaw: {
    type: dbConnection.Sequelize.JSON,
  },
  reportDataParsed: {
    type: dbConnection.Sequelize.JSON,
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
TestReport.sync();
module.exports = TestReport;
