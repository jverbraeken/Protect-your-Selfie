"use strict";


const pg = require('pg');


var postgres;


module.exports.connect = function() {
	pg.connect(process.env.database_url, function(err, client, done) {
		if(err) {
			log.warn('PostgreSQL database not connected:', err);
		} else {
			postgres = client;
		}
	});
}
