var glob  = require('glob');
var css   = require('css');
var fs    = require('fs');
var merge = require('lodash/object/merge');

var util = require('util');

var result = {};

// Get the AST for file at path location
function parseFile(filePath) {
  var file = fs.readFileSync(filePath, 'utf8');
  var ast = css.parse(file);
  result = merge(result, ast);
  console.log(util.inspect(result, {depth: null}))
}

// Handle files glob
function handleFiles(err, files) {
  if (err) throw err;
  files.forEach(parseFile);
}

// Main entry point
module.exports = function(cssGlob) {
  result = {};
  glob(cssGlob, handleFiles)
}
