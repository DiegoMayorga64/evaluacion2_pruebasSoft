import jwt from 'jsonwebtoken';
import envs from '../configs/environment';

const {
  JWT: { SECRET, DEFAULT_EXPIRES },
} = envs;

/**
 * Generate a JWT token with the data object
 * @param {object} args.data - Payload to encode
 * @param {string | Number} args.expiresIn - Expire the token in (DEFAULT_EXPIRES by default)
 * @returns {string} Generated token
 */
function generateToken({ data, expiresIn = DEFAULT_EXPIRES }) {
  return jwt.sign(data, SECRET, { expiresIn });
}

/**
 * Verify and decode the token
 * @param {string} token - JWT to decode
 * @returns {object} decoded payload
 * @throws {jwt.JsonWebTokenError} Error if the token is expired or the secret key doesn't work
 */
function verifyToken(token) {
  return jwt.verify(token, SECRET);
}

export { generateToken, verifyToken };
