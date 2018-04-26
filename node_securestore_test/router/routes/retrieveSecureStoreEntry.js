/*eslint no-shadow: 0*/
"use strict";

module.exports = function() {
	var express = require("express");
	var hdbext = require("@sap/hdbext");
	var app = express.Router();
	
	app.get('/', function(req, res) {
		hdbext.loadProcedure(req.db, "SYS", "USER_SECURESTORE_RETRIEVE", function(error, proc) {
			if(error) {
				res.send("Error during procedure loading:" + error.message);
				return;
			}
			
			proc({"STORE_NAME":"TEST_STORE", 
			      "FOR_XS_APPLICATIONUSER": false, 
			      "KEY": "TEST_VALUE"}, function(error, out_parameters){
				if(error) {
					res.send("Error during procedure execution: " + error.message);
					return;
				}
				
				if(!out_parameters.hasOwnProperty("VALUE")) {
					res.send("Value of secure store entry could not be determined.");
					return;
				}

				res.send("Retrieved value: " + Buffer.from(out_parameters["VALUE"]).toString());	
			});
		});
	});

	return app;
};