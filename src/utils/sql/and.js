/**
 * Join the given conditions with AND
 * @param  {string[]} args
 * @returns
 */
const and = (...args) => {
  const conditions = args.filter(x => !!x);
  return !!conditions.length ? `(${conditions.join(' AND ')})` : '';
};

export default and;
