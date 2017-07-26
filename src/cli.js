

class Cli {
  constructor() {
    this.handlers = [];
    this.maps = {};
    this.default = '-h';
    this.normal = function normal() {};
  }

  on(argvs, handler) {
    argvs.forEach(((item) => {
      this.maps[item] = handler;
    }));
  }

  end() {
    // abstract
  }

  normal() {
    // abstract
  }

  parse(argvs) {
    if (argvs.length === 0) {
      this.normal();
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
        handler.call(null, arg);
        i += 1;
      } else {
        console.info(`${argvs[i]} is invalid, please use -h or --help for help`);
        this.parse(['-h']);
        return;
      }
    }
    this.end();
  }
}

module.exports = Cli;
