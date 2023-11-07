import { required, mustBe, requiredAndValid } from './common.messages';

const ref = 'auth';

export default {
  login: {
    validation: {
      name: `${ref}_login_validation_error`,
      messages: {
        email: requiredAndValid({ key: 'email', type: 'email' }),
        password: required('password'),
      },
    },
    invalidCredentials: {
      name: `${ref}_login_invalid_credentials_error`,
      message: 'invalid credentials',
    },
  },
};
