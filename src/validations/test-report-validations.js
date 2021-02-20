const Joi = require('@hapi/joi');
const { HTTP } = require('../../config');

const validate = (schema, data) => {
  try {
    const value = schema.validate(data, { abortEarly: false });
    return value;
  } catch (error) {
    return error;
  }
};

const getTestReportList = async (req, res, next) => {
  const { error } = await validate(Joi.object().keys({
    size: Joi.string().regex(/^[1-9][0-9]*$/).required(),
    page: Joi.string().regex(/^[1-9][0-9]*$/).required(),
    prescriptionId: Joi.string(),
  }), req.query);

  if (error) {
    const details = error.details.map(({ message, context }) => ({
      message: message.replace(/['"]/g, ''),
      label: context.label,
    }));
    return res.status(HTTP.CODES.bad_request).json({ errorType: HTTP.ERROR_TYPE.bad_input_error, message: details });
  }
  if (!error) {
    next();
  }
};

const getTestReport = async (req, res, next) => {
  const { error } = await validate(Joi.object().keys({
    reportId: Joi.string(),
  }), req.params);

  if (error) {
    const details = error.details.map(({ message, context }) => ({
      message: message.replace(/['"]/g, ''),
      label: context.label,
    }));
    return res.status(HTTP.CODES.bad_request).json({ errorType: HTTP.ERROR_TYPE.bad_input_error, message: details });
  }
  if (!error) {
    next();
  }
};

const createTestReport = async (req, res, next) => {
  const { error } = await validate(Joi.object().keys({
    prescriptionTestId: Joi.number().required(),
    reportDataRaw: Joi.object().required(),
    reportDataParsed: Joi.object().required(),
  }),
  req.body);

  if (error) {
    const details = error.details.map(({ message, context }) => ({
      message: message.replace(/['"]/g, ''),
      label: context.label,
    }));
    return res.status(HTTP.CODES.bad_request).json({ errorType: HTTP.ERROR_TYPE.bad_input_error, message: details });
  }
  if (!error) {
    next();
  }
};

// comment

const createReportComment = async (req, res, next) => {
  const { error } = await validate(Joi.object().keys({
    testReportId: Joi.number().required(),
    doctorId: Joi.number().required(),
    comment: Joi.string().required(),
  }),
  req.body);

  if (error) {
    const details = error.details.map(({ message, context }) => ({
      message: message.replace(/['"]/g, ''),
      label: context.label,
    }));
    return res.status(HTTP.CODES.bad_request).json({ errorType: HTTP.ERROR_TYPE.bad_input_error, message: details });
  }
  if (!error) {
    next();
  }
};
const getReportCommentList = async (req, res, next) => {
  console.log('ede');
  const { error } = await validate(Joi.object().keys({
    size: Joi.string().regex(/^[1-9][0-9]*$/).required(),
    page: Joi.string().regex(/^[1-9][0-9]*$/).required(),
  }), req.query);

  if (error) {
    const details = error.details.map(({ message, context }) => ({
      message: message.replace(/['"]/g, ''),
      label: context.label,
    }));
    return res.status(HTTP.CODES.bad_request).json({ errorType: HTTP.ERROR_TYPE.bad_input_error, message: details });
  }
  if (!error) {
    next();
  }
};
module.exports = {
  createTestReport,
  getTestReport,
  getTestReportList,
  createReportComment,
  getReportCommentList,
};
