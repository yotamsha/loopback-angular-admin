/**
 * Created by yotam on 28/06/2016.
 */

app = require('../server/server');

  before(function(done) {
    console.log("before all")
    // Increase the Mocha timeout so that Sails has enough time to lift.
    //this.timeout(1000);
    process.NODE_ENV = 'test';
    done(null);
  });

  after(function(done) {
    console.log("after all")
    done();
    // here you can clear fixtures, etc.
  });

