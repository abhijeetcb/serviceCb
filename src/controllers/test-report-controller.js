const Axios = require('axios');
const Sequelize = require('sequelize');
const logger = require('../../config/logger');
const { HTTP, USER_TYPE } = require('../../config');
const TestReport = require('../models/test-report-model');
const ReportComment = require('../models/report-comment-model');

const listTestReport = async (req, res) => {
  try {
    const query = { };
    if (req.query.prescriptionId) {
      // fetch prescription tests on the basis of prescriptionId

      const response = await Axios.get(
        `${process.env.TREATMENT_SERV_ENDPOINT}prescriptions/test?size=50&page=1&prescriptionId=${req.query.prescriptionId}`,
        {
          headers: { AuthToken: req.header('AuthToken') },
        },
      );
      if (!response.data) {
        return res.status(HTTP.CODES.internal_server_error).json({ errorType: HTTP.ERROR_TYPE.server_error, message: HTTP.ERROR_MESSAGE.resource_fetch_failed });
      }

      Object.assign(query, {
        where: { prescriptionTestId: { [Sequelize.Op.in]: response.data.map((x) => x.id) } },
      });
    }
    Object.assign(query, {
      order: [['updatedAt', 'DESC']],
      offset: ((parseInt(req.query.page) - 1) * parseInt(req.query.size)),
      limit: req.query.size,
    });
    const prescriptionTests = await TestReport.findAll(query);
    res.status(HTTP.CODES.success).json(prescriptionTests);
  } catch (error) {
    logger.error(error.stack);
    return res.status(HTTP.CODES.internal_server_error).json({ errorType: HTTP.ERROR_TYPE.server_error, message: error.stack });
  }
};

const getTestReport = async (req, res) => {
  try {
    const testReport = await TestReport.findByPk(req.params.reportId);
    res.status(HTTP.CODES.success).json(testReport);
  } catch (error) {
    logger.error(error.stack);
    return res.status(HTTP.CODES.internal_server_error).json({ errorType: HTTP.ERROR_TYPE.server_error, message: error.stack });
  }
};

const createTestReport = async (req, res) => {
  try {
    // accessible to admin only
    if (req.body.userType !== USER_TYPE.ADMIN) {
      return res.status(HTTP.CODES.forbidden).json({ errorType: HTTP.ERROR_TYPE.forbidden_error, message: HTTP.ERROR_MESSAGE.resource_not_allowed });
    }

    // check if the test report already exist for prescription test
    const testReportExist = await TestReport.findOne({ where: { prescriptionTestId: req.body.prescriptionTestId } });
    if (testReportExist !== null) {
      return res.status(HTTP.CODES.success).json(testReportExist);
    }

    // check prescription test id exist

    const response = await Axios.get(
      `${process.env.TREATMENT_SERV_ENDPOINT}prescriptions/test/${req.body.prescriptionTestId}`,
      {
        headers: { AuthToken: req.header('AuthToken') },
      },
    );
    if (!response.data) {
      return res.status(HTTP.CODES.internal_server_error).json({ errorType: HTTP.ERROR_TYPE.server_error, message: HTTP.ERROR_MESSAGE.resource_fetch_failed });
    }

    const testReport = {
      prescriptionTestId: req.body.prescriptionTestId,
      reportDataRaw: req.body.reportDataRaw,
      reportDataParsed: req.body.reportDataParsed,
    };
    const testReportAdded = await TestReport.create(testReport);
    return res.status(HTTP.CODES.created).json({ id: testReportAdded.id });
  } catch (error) {
    logger.error(error.stack);
    return res.status(HTTP.CODES.internal_server_error).json({ errorType: HTTP.ERROR_TYPE.server_error, message: error.stack });
  }
};

const createReportComment = async (req, res) => {
  try {
    // only appointed dr. can access this
    if (req.body.userType !== USER_TYPE.DOCTOR) {
      return res.status(HTTP.CODES.forbidden).json({ errorType: HTTP.ERROR_TYPE.forbidden_error, message: HTTP.ERROR_MESSAGE.resource_not_allowed });
    }

    const reportComment = {
      testReportId: req.body.testReportId,
      doctorId: req.body.doctorId,
      comment: req.body.comment,
    };
    const reportCommentAdded = await ReportComment.create(reportComment);
    return res.status(HTTP.CODES.created).json({ id: reportCommentAdded.id });
  } catch (error) {
    logger.error(error.stack);
    return res.status(HTTP.CODES.internal_server_error).json({ errorType: HTTP.ERROR_TYPE.server_error, message: error.stack });
  }
};

const listReportComment = async (req, res) => {
  try {
    // only appointed dr. can access this
    if (req.body.userType !== USER_TYPE.DOCTOR) {
      return res.status(HTTP.CODES.forbidden).json({ errorType: HTTP.ERROR_TYPE.forbidden_error, message: HTTP.ERROR_MESSAGE.resource_not_allowed });
    }

    const reportComment = await ReportComment.findAll({
      order: [['updatedAt', 'DESC']],
      offset: ((parseInt(req.query.page) - 1) * parseInt(req.query.size)),
      limit: req.query.size,
    });

    return res.status(HTTP.CODES.created).json(reportComment);
  } catch (error) {
    logger.error(error.stack);
    return res.status(HTTP.CODES.internal_server_error).json({ errorType: HTTP.ERROR_TYPE.server_error, message: error.stack });
  }
};
module.exports = {
  listTestReport,
  getTestReport,
  createTestReport,
  createReportComment,
  listReportComment,
};
