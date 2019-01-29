const chalk = require('chalk');

const log = console.log;

const infoTypes = [
  {
    type: 'info',
    color: 'white',
  },
  {
    type: 'error',
    color: 'bgRed',
  },
  {
    type: 'warn',
    color: 'yellow',
  },
];

const _ = infoTypes.reduce((logger, infoType) => {
  logger[infoType.type] = (...args) => {
    const text = args[0];
    args[0] = `[fozy] ${text}`;
    log(chalk[infoType.color](args[0]), ...args.slice(1));
  };
  return logger;
}, {});

module.exports = _;
