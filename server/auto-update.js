/**
 * Created by yotam on 21/06/2016.
 */

var app = require('./server');
var ds = app.dataSources.db;
var lbTables = [
    "User", "accessToken", "userCredential", "userIdentity",
    "ACL", "RoleMapping", "Role", "AppModel", "Page", "Post",
    "Setting", "Product", "Category", "Event", "AuthProvider", "Meta"
];
ds.autoupdate(lbTables, function (er) {
    if (er) throw er;
    console.log('Loopback tables [' + lbTables + '] created in ', ds.adapter.name);
    ds.disconnect();
});


