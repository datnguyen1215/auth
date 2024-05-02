import format from 'pg-format';

const offset = offset => {
  return offset ? format('OFFSET %L::int', offset) : '';
};

export default offset;
