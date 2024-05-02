import format from 'pg-format';

const limit = limit => {
  return !!limit ? format('LIMIT %L::int', limit) : '';
};

export default limit;
