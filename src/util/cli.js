class Cli {
  constructor() {
    this.handlers = [];
    this.maps = {};
    this.default = '-h';
  }

  on(argvs, handler) {
    argvs.forEach(((item) => {
      this.maps[item] = handler;
    }));
  }

  onEnd(callback) {
    this.onEndCallback = callback;
  }

  parse(argvs) {
    if (argvs.length === 0) {
      this.onEndCallback();
      return;
    }

    for (let i = 0, len = argvs.length; i < len;) {
      let arg;
      const handler = this.maps[argvs[i]];

      if (handler !== undefined) {
        if (!/^-{1,2}/.test(argvs[i + 1])) {
          i += 1;
          arg = argvs[i];
        }
        const result = handler.call(null, arg);
        if (result === false) {
          return;
        }
        i += 1;
      } else {
        console.info(`${argvs[i]} is invalid, please use -h or --help for help`);   // eslint-disable-line
        this.parse(['-h']);
        return;
      }
    }
    this.onEndCallback();
  }
}

export default Cli;
export {
  Cli,
};
