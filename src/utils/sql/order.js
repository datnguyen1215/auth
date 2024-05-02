import format from 'pg-format';

const order = str => {
  return !!str ? format('ORDER BY %s', str) : '';
};

export default order;
