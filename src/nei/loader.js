import { log } from '../util';

const req = require('../../lib/promise/req');

const neiHost = 'https://nei.netease.com';
const specType = 0;

const loader = async (key) => {
  const url = `${neiHost}/api/projectres/?key=${encodeURIComponent(key)}&spectype=${specType}`;
  try {
    const json = await req({
      url,
    });
    const data = JSON.parse(json.toJSON().body);
    if (data.code !== 200) {
      throw data;
    } else {
      return data.result;
    }
  } catch (err) {
    log.error('NEI configuration download error: ', err);
  }
  return null;
};

module.exports = loader;
