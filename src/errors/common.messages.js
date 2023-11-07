/**
 * Is required generic message
 * @param {string} key - Required key
 * @returns {string}
 */
const required = (key) => `${key} is required`;

/**
 * Key is required and must be a valid type generic message
 * @param {string} args.key - Required key
 * @param {string} args.type - Needed type
 * @returns {string}
 */
const requiredAndValid = ({ key, type }) =>
  `${key} is required and must be a valid ${type}`;

/**
 * Key must be a valid type generic message
 * @param {string} args.key - key
 * @param {string} args.type - Needed type
 * @returns {string}
 */
const mustBe = ({ key, type }) => `${key} must be a valid ${type}`;

export { required, requiredAndValid, mustBe };
