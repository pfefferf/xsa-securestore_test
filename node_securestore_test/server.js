/*eslint no-console: 0, no-unused-vars: 0*/
"use strict";

// create express app
var app = require("express")();

// add secure store middleware to express app
var xsenv = require("@sap/xsenv");
var hdbext = require("@sap/hdbext");

var hanaOptions = xsenv.getServices({
	secureStore: {
		name: "securestore_test-hana"
	}
});

app.use(
	hdbext.middleware(hanaOptions.secureStore)	
);

// create server instance
var server = require("http").createServer();

// setup routes of express app
var router = require("./router")(app, server);

// start server
var port = process.env.PORT || 3000;
server.on("request", app);
server.listen(port, function() {
	console.info('HTTP Server: ${server.address().port}');
});