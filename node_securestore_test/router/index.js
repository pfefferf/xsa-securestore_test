/*eslint-env node, es6 */
/*eslint no-unused-vars: 0*/
"use strict";

module.exports = (app, server) => {
	app.use("/createSecureStoreEntry", require("./routes/createSecureStoreEntry")());
	app.use("/retrieveSecureStoreEntry", require("./routes/retrieveSecureStoreEntry")());
	app.use("/deleteSecureStoreEntry", require("./routes/deleteSecureStoreEntry")());
};