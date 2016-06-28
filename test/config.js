/**
 * Created by yotam on 28/06/2016.
 */
var config = {
  baseUrl: 'http://localhost',
  port: 3000,
  apiPrefix: '/api',
  setupAndTeardown: function (app) {
    (function(app){
      before(function () {
        console.log("shared before");
        
      });
      after(function () {
        console.log("shared after");
      });

    })(app);

  }

};
module.exports = config;

