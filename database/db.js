"use strict";


const pg = require('pg');


var postgres;


module.exports.connect = function() {
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		if(err) {
			log.warn('PostgreSQL database not connected:', err);
		} else {
			postgres = client;
		}
	});
}

module.export.get = function() {
	return postgres;
}
