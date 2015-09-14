'use strict';

var csv = require('fast-csv'),
  q = require('q'),
  winston = require('winston'),
  fs = require('fs'),
  _ = require('underscore');

var read = function(input) {
  winston.debug('READER - Reading file ' + input);
  var parsedFile = [];

  var d = q.defer();

  var stream = fs.createReadStream(input);

  var csvStream = csv
    .parse({
      headers: true
    })
    .on('data', function(data) {
      parsedFile.push(data);
    })
    .on('end', function(){
      winston.info('READER - Read ' + _.size(parsedFile) + ' raw entries in file ' + input);
      stream.destroy();
      d.resolve(parsedFile);
    });

    stream.pipe(csvStream);

    return d.promise;
};

module.exports = {
  read: read
};