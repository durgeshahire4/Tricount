var requirejs = require('requirejs');
console.log(requirejs);

requirejs.config({
    //Pass the top-level main.js/index.js require
    //function to requirejs so that node modules
    //are loaded relative to the top-level JS file.
    nodeRequire: require
});

requirejs(['server'],function(server) {
  server.listen(8000);
});