const USER_TYPE = {
  DOCTOR: 'DOCTOR',
  ADMIN: 'ADMIN',
  PATIENT: 'PATIENT',
};
const HTTP = {
  CODES: {
    success: 200,
    created: 201,
    not_found: 404,
    internal_server_error: 500,
    bad_request: 400,
    forbidden: 403,
    unauthenticated: 401,
    service_unavalable: 503,
  },
  ERROR_TYPE: {
    validation_error: 'VALIDATION_ERROR',
    server_error: 'SERVER_ERROR',
    db_error: 'DB_ERROR',
    authorization_error: 'NOT_AUTHORIZED',
    authentication_error: 'NEED_AUTHENTICATION',
    bad_input_error: 'BAD REQUEST',
    forbidden_error: 'FORBIDDEN',
    service_down: 'SERVICE_UNAVAILABLE',
  },
  ERROR_MESSAGE: {
    resource_creation_failed: 'Resource Creation Failed',
    resource_updation_failed: 'Resouce Updation Failed',
    resource_fetch_failed: 'Failed to fetch resource',
    resource_query_failed: 'Failed while querying database',
    resource_not_found: 'Resource Not Found',
    resource_not_allowed: 'Not Allowed to access the resource',
    duplicate_entry: 'Duplicate record not allowed',
  },
};

const PRESCRIPTION_TYPE = {
  DIAGNOSIS: 'DIAGNOSIS',
  MEDICINAL: 'MEDICINAL',
};

const BUFFER_TIME = {
  AFTER: 15,
  BEFORE: 10,
};

const DOSES = {
  AFTER_LUNCH: 'AFTER LUNCH',
  BEFORE_LUNCH: 'BEFORE LUNCH',
  AFTER_BREAKFAST: 'AFTER BREAKFAST',
  BEFORE_BREAKFAST: 'BEFORE BREAKFAST',
  AFTER_EVENING_SNACK: 'AFTER EVENING SNACK',
  BEFORE_EVENING_SNACK: 'BEFORE EVENING SNACK',
  BEFORE_DINNER: 'BEFORE DINNER',
  AFTER_DINNER: 'AFTER DINNER',
};

const EMAIL_MESSAGE = {
  CONFIRM_APPOINTMENT_PATIENT: 'Your Appointment is confirmed on 20 Jan 2021 at 10:30',
  CONFIRM_APPOINTMENT_DOCTOR: 'You have an Appointment on 20 Jan 2021 at 10:30',
  CANCEL_APPOINTMENT_PATIENT: 'Your Appointment is cancelled for 20 Jan 2021 at 10:30',
  CANCEL_APPOINTMENT_DOCTOR: 'Appointment for 20 Jan 2021 at 10:30 has cancelled',
  GENERATE_PRESCRIPTION: 'Your Prescription for appID:110 has generated',
  UPDATE_APPOINTMENT: 'Your Appointment is schedules on 20 jan 2021 at 8:45',

};

const EMAIL_SUBJECT = {
  CONFIRM_APPOINTMENT: 'Appointment Confirmation',
  CANCEL_APPOINTMENT: 'Appointment Cancelled',
  GENERATE_PRESCRIPTION: 'Your Prescription has generated',
  UPDATE_APPOINTMENT: 'Your Appointment has appointed on 20 Jan 2021',
};

const VALIDATION = {
  APPOINTMENT_STATUS: ['PENDING', 'APPOINTED', 'CANCELED'],
};

const APPOINTMENT_STATUS = {
  PENDING: 'PENDING',
  APPOINTED: 'APPOINTED',
  CANCELED: 'CANCELED',
};

const ORDER_STATUS = {
  PENDING: 'PENDING',
  ON_ROUTE: 'ON-ROUTE',
  DELIVERED: 'DELIVERED',
  PAID: 'PAID',
  CANCELED: 'CANCELED',
};

const INVENTORY_ITEM_TYPE = {
  MEDICINE: 'MEDICINE',
};

const INVENTORY_STATUS = {
  AVAILABLE: 'AVAILABLE',
  NOT_AVAILABLE: 'NOT_AVAILABLE',
  DISCONTINUED: 'DISCONTINUED',
};
const ADHERENCE_STATUS = {
  STARTED: 'STARTED',
  COMPLETED: 'COMPLETED',
};

const TEST_METHODS = {
  SELF: 'SELF',
  TP_HOME_SAMPLE_COLLECTION: 'TP_HOME_SAMPLE_COLLECTION',
  CLINIC_VISIT: 'CLINIC_VISIT',
};

const REPORT_METHODS = {
  MANUAL_PATIENT: 'MANUAL_PATIENT',
  MANUAL_ADMIN: 'MANUAL_ADMIN',
  THIRD_PARTY_URL_PULL: 'THIRD_PARTY_URL_PULL',
  FILE_UPLOAD: 'FILE_UPLOAD',
};

const PAGINATION = {
  page: 1,
  size: 10,
};

module.exports = {
  HTTP,
  USER_TYPE,
  PRESCRIPTION_TYPE,
  BUFFER_TIME,
  DOSES,
  EMAIL_MESSAGE,
  EMAIL_SUBJECT,
  VALIDATION,
  APPOINTMENT_STATUS,
  ORDER_STATUS,
  INVENTORY_ITEM_TYPE,
  INVENTORY_STATUS,
  ADHERENCE_STATUS,
  PAGINATION,
  TEST_METHODS,
  REPORT_METHODS,
};
