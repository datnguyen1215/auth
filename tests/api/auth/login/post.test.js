import errors from '@/src/errors';
import axios from 'axios';
import { expect } from 'chai';
import settings from '@/src/settings';

const config = settings.get();
const baseURL = `http://localhost:${config.http.port}`;
const apiPath = '/api/auth/login';

const DEFAULT_USER = {
  email: 'login.test@local.com',
  password: 'password'
};

describe(`POST ${apiPath}`, () => {
  it('should complain when missing email', async () => {
    const resp = await axios
      .post(`${baseURL}${apiPath}`, { ...DEFAULT_USER, email: undefined })
      .catch(err => err.response);

    expect(resp.data.error.code).to.equal(errors.codes.MISSING_FIELDS);
  });

  it('should complain when missing password', async () => {
    const resp = await axios
      .post(`${baseURL}${apiPath}`, { ...DEFAULT_USER, password: undefined })
      .catch(err => err.response);

    expect(resp.data.error.code).to.equal(errors.codes.MISSING_FIELDS);
  });

  it('should complain when email is not found', async () => {
    const resp = await axios
      .post(`${baseURL}${apiPath}`, {
        ...DEFAULT_USER,
        email: 'test2@local.com'
      })
      .catch(err => err.response);

    expect(resp.data.error.code).to.equal(errors.codes.INVALID_CREDENTIALS);
  });

  it('should complain when password is incorrect', async () => {
    const resp = await axios
      .post(`${baseURL}${apiPath}`, { ...DEFAULT_USER, password: 'password2' })
      .catch(err => err.response);

    expect(resp.data.error.code).to.equal(errors.codes.INVALID_CREDENTIALS);
  });

  it('should return a user when email and password are correct', async () => {
    const resp = await axios
      .post(`${baseURL}${apiPath}`, DEFAULT_USER)
      .catch(err => err.response);

    expect(resp.data.user).to.be.an('object');
    expect(resp.data.user.email).to.equal(DEFAULT_USER.email);
    expect(resp.data.user.password, 'password should not be returned').to.be
      .undefined;
  });
});
