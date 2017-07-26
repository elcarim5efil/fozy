const request = require('request');

const req = async function req(option) {
  return new Promise(((resolve, reject) => {
    request(option, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  }));
};

module.exports = req;
