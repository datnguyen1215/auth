import aliases from 'module-alias';
import path from 'path';

aliases.addAliases({
  '@': path.resolve('.'),
  '@src': path.resolve('./src')
});
