"use strict"

const Vue = require('vue');
const request = require('request');
const request_promise = require('request-promise');

var app = new Vue({
	el: '#documentListTable',
	data: {
		documents: [
			{
				name: "Payslip 24-02-17",
				filename: "payslip.pdf",
				description: "Payslip of the second month of 2017",
				uploadDate: "clientProfile.html",
				access: ["Aegon", "Het Spaarne ziekenhuis"]
			}
		]
	}
});

let table = document.getElementById("table_documents");
request.get("/get_files").then(function(tmp) {
	console.log(tmp);
});