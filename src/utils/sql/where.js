import format from 'pg-format';

/**
 * Create a WHERE clause from the given conditions. These conditions are already
 * joined with AND or OR operators.
 * @param  {string} str
 */
const where = str => {
  return !!str ? format('WHERE %s', str) : '';
};

export default where;
