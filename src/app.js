'use strict';

var program = require('commander'),
  winston = require('winston'),
  fs = require('fs'),
  q = require('q'),
  reader = require('./utils/reader.js'),
  parser = require('./utils/parser.js'),
  writer = require('./utils/writer.js');


program
  .version('1.0.0')
  .option('-i, --input [name]', 'Path to input file. Defaults to ./input/input.csv')
  .option('-o, --output [name]', 'Path to output file. Defaults to ./output/output.csv')
  .option('-l, --logfile', 'Path to log file. Defaults to false')
  .parse(process.argv);

var input = program.input ? program.input : './input/input.csv',
  output = program.output ? program.output : './output/output.csv',
  log  = program.logfile ? true : false;

if(log) {
  var timestamp = fs._toUnixTimestamp(new Date()).toString(),
    timestamp_parsed = timestamp.replace('.', '_'),
    logger_name = './logs/' + timestamp_parsed + '.log';

    winston.add(winston.transports.File, {
      filename: logger_name,
      level: 'debug'
    });
}

winston.info('\n--------------------------' +
  '\nCSV parser' +
  '\n--------------------------' +
  '\nRunning with options:' +
  '\nInput:\t' + input +
  '\nOutput:\t' + output + 
  '\nLogs:\t' + log );


reader.read(input)
  .then(function(fileData) {
    return parser.parse(fileData);
  })
  .then(function(parsedData) {
    return writer.write(parsedData, output);
  })
  .done();