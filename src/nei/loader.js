

const req = require('../../lib//promise/req.js');

const neiHost = 'https://nei.netease.com';
const specType = 0;

const loader = async (key, cb) => {
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
    console.log('NEI configuration download error: ', err);
  }
};

module.exports = loader;
