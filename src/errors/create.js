class CustomError extends Error {
  constructor({ status, code, message }) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

/**
 * Create error object with status, code, and message.
 * @param {object} param0
 * @param {number} param0.status
 * @param {string} param0.code
 * @param {string} param0.message
 * @returns {CustomError}
 */
const create = ({ status, code, message }) => {
  return new CustomError({ status, code, message });
};

module.exports = create;
