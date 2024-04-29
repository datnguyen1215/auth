import pool from './pool';

const query = async (text, params) => {
  return await pool.query(text, params);
};

export default query;
