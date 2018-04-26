/*eslint no-shadow: 0*/
"use strict";

module.exports = function() {
	var express = require("express");
	var hdbext = require("@sap/hdbext");
	var app = express.Router();
	
	app.get('/', function(req, res) {
		hdbext.loadProcedure(req.db, "SYS", "USER_SECURESTORE_INSERT", function(error, proc) {
			if(error) {
				res.send("Error during procedure loading:" + error.message);
				return;
			}
			
			proc({"STORE_NAME":"TEST_STORE", 
			      "FOR_XS_APPLICATIONUSER": false, 
			      "KEY": "TEST_VALUE", 
			      "VALUE": Buffer.from("Test Secure Store Value")}, function(error){
				if(error) {
					res.send("Error during procedure execution: " + error.message);
					return;
				}
				res.send("Entry in secure store successfully created.");	
			});
		});
	});

	return app;
};