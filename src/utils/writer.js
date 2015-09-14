'use strict';

var fs = require('fs'),
  q = require('q'),
  csv = require('fast-csv'),
  winston = require('winston');


var write;

write = function(data, output) {
  var ws = fs.createWriteStream(output);

  csv
    .write(data, {
      headers: true
    })
    .pipe(ws);

};

module.exports = {
  write: write
};