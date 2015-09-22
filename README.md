# CSV Builder

> A simple node script, to read a CSV, parse the data and output the result to another csv.

## Quickstart

  1. Implement `src/parser.js` with the how you want to parse each entry in the input file. `parser.js` should export a `parse(data)` function where `data` is an array of elements and should return a promise that returns an array.
  1. `npm install`
  1. `node src/app.js` will parse a `input/input.csv` file and produce an `output/output.csv` file.

## Available command line options

| option | default | description |
| ------ | ------- | ----------- |
| `-i` or `--input` | `input/input.csv` | path to the input file |
| `-o` or `--output` | `output/output.csv` | path to output file |
| `-l` or `--logfile` | `false` | whether or not to save logs in `logs/<timestamp>.log` |

