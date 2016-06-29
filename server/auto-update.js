/**
 * Created by yotam on 21/06/2016.
 */
process.env.DB_MIGRATION = true;
var app = require('./server');
var ds = app.dataSources.db;
/*var lbTables = [
    "User", "accessToken", "userCredential", "userIdentity",
    "ACL", "RoleMapping", "Role", "AppModel", "Page", "Post",
    "Setting", "Product", "Category", "Event", "AuthProvider", "Meta"
];*/

// NOTE - changes to user are not updated. Should use a specific ['user'] as first argument.
ds.autoupdate(null, function (er) {
    if (er) throw er;
    console.log('Loopback tables created in ', ds.adapter.name);
    ds.disconnect();
});


