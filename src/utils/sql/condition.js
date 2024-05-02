import format from 'pg-format';

const condition = ({ column, value, type, operator }) => {
  if (!column || !value) return '';

  type = type ? `::${type}` : '';

  return format('%I %s %L%s', column, operator, value, type);
};

export default condition;
