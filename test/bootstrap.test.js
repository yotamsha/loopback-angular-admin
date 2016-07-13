/**
 * Created by yotam on 28/06/2016.
 */
function waitTillReady(value,cb){
  if (value){
    cb();
  } else {
    setTimeout(function(){
      waitTillReady(value,cb)
    },500);
  }
  
}

  before(function(done) {
    process.NODE_ENV = 'test';

    app = require('../server/server');

    console.log("before all")
    // Increase the Mocha timeout so that Sails has enough time to lift.
    this.timeout(5000);
    waitTillReady( app.setupFixtures , function(){
      app.setupFixtures(function(){
        console.log("Fixtures loaded");
        done();
      });
    });
/*    setTimeout(function(){

    },1000);*/
  });

  after(function(done) {
    console.log("after all");
    app.teardownFixtures(function(){
      console.log("Fixtures teardown");
      done();

    });
    // here you can clear fixtures, etc.
  });

