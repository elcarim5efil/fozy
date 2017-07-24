

import path from 'path';

export default function requireWithNoCache(file) {
  delete require.cache[path.resolve(file)];
  /*eslint-disable*/
  return require(file);
  /*eslint-enable*/
}
