const stream = require('stream');

class LineUnitizer extends stream.Transform {
  constructor(delimiter="\n") {
    super();
    this.buffer = "";
    this.delimiter = delimiter;
  }
  _transform(chunk, enc, done) {
    this.buffer += chunk.toString();
    var lines = this.buffer.split(this.delimiter);
    this.buffer = lines.pop();
    lines.forEach(line => this.push(line));
    done();
  }
}

module.exports = LineUnitizer;