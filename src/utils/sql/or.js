/**
 * Join the given conditions with OR
 * @param  {string[]} args
 * @returns
 */
const or = (...args) => {
  const conditions = args.filter(x => !!x);
  return !conditions.length ? '' : `(${conditions.join(' OR ')})`;
};

export default or;
