import errors from '@/src/errors';
import chai from 'chai';
import axios from 'axios';
import settings from '@/src/settings';
import db from '@/src/db';

const { expect } = chai;
const config = settings.get();
const baseURL = `http://localhost:${config.http.port}`;
const apiPath = '/api/auth/signup';

const DEFAULT_USER = {
  password: 'password',
  first_name: 'John',
  last_name: 'Doe',
  email: 'test@local.com'
};

describe(`POST ${apiPath}`, () => {
  it('should complain when missing password', async () => {
    const resp = await axios
      .post(`${baseURL}${apiPath}`, { ...DEFAULT_USER, password: undefined })
      .catch(err => err.response);

    expect(resp.data.error.code).to.equal(errors.codes.MISSING_FIELDS);
  });

  it('should complain when missing email', async () => {
    const resp = await axios
      .post(`${baseURL}${apiPath}`, { ...DEFAULT_USER, email: undefined })
      .catch(err => err.response);

    expect(resp.data.error.code).to.equal(errors.codes.MISSING_FIELDS);
  });

  it('should complain when missing first_name', async () => {
    const resp = await axios
      .post(`${baseURL}${apiPath}`, { ...DEFAULT_USER, first_name: undefined })
      .catch(err => err.response);

    expect(resp.data.error.code).to.equal(errors.codes.MISSING_FIELDS);
  });

  it('should create user even if missing last_name', async () => {
    const resp = await axios
      .post(`${baseURL}${apiPath}`, { ...DEFAULT_USER, last_name: undefined })
      .catch(err => err.response);

    expect(resp.data.user).to.be.an('object');
    expect(resp.data.user.email).to.equal(DEFAULT_USER.email);
    expect(resp.data.user.first_name).to.equal(DEFAULT_USER.first_name);
    expect(resp.data.user.password, 'password should not be returned').to.be
      .undefined;
  });

  it('should create a new user and return it', async () => {
    const resp = await axios
      .post(`${baseURL}${apiPath}`, DEFAULT_USER)
      .catch(err => err.response);

    expect(resp.data.user).to.be.an('object');
    expect(resp.data.user.email).to.equal(DEFAULT_USER.email);
    expect(resp.data.user.first_name).to.equal(DEFAULT_USER.first_name);
    expect(resp.data.user.last_name).to.equal(DEFAULT_USER.last_name);
    expect(resp.data.user.password, 'password should not be returned').to.be
      .undefined;
  });

  afterEach(async () => {
    await db
      .query('DELETE FROM users WHERE email = $1', [DEFAULT_USER.email])
      .catch();
  });
});
