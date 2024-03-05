// repl.js
let stream = require('stream');

class Repl extends stream.Writable {
  _parse(line) {
    var [cmd, ...args] = line.split(/\s+/);
    return {cmd, args};
  }
  _write(line, enc, done) {
    var {cmd, args} = this._parse(line.toString());
    this.emit(cmd, args);
    done();
  }
}

module.exports = Repl;