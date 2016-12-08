var loopback = require('loopback');
var boot = require('loopback-boot');
var app = module.exports = loopback();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// setup servers logging.
var winston = require('winston');
var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      timestamp: function() {
        return Date.now();
      },
      formatter: function(options) {
        // Return string will be passed to logger.
        return new Date().toLocaleString('en-US') +' * '+ options.level.toUpperCase() +' * '+ (undefined !== options.message ? options.message : '');
      }
    }),
    new (winston.transports.File)({
      name: 'info-file',
      filename: 'log/out.log',
      level: 'info'
    }),
    new (winston.transports.File)({
      name: 'error-file',
      filename: 'log/err.log',
      level: 'error'
    })
  ]
});

console.log = logger.info; // redirect console.log through Winston.
console.error = logger.error; // redirect console.error through Winston.


app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    logger.log('info','Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      logger.log('info','Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
console.log("starting boot");
boot(app, __dirname, function(err) {
  if (err) throw err;
  console.log("boot finished");

  // start the server if `$ node server.js`
  if (require.main === module) {
    app.start();
    console.log("starting app..")
  }
});


app.use(function(req, res, next) { // log each request
  req.reqId = new Date().getTime();
  logger.log("info","*** ID: "+ req.reqId +" : " + req.url);
  logger.log("info","*** Body: " + JSON.stringify(req.body, null, 2));

  next(); // Passing the request to the next handler in the stack.
});

var mung = require('express-mung');
app.use(mung.json(
  function transform(body, req, res) {
    console.log(req.reqId + " * Response body: " + JSON.stringify(body));
    return body;
  }
));
