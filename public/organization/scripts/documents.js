"use strict"

const Vue = require('vue');
const request = require('request');
const request_promise = require('request-promise');

document.addEventListener('DOMContentLoaded', function() {
	var app = new Vue({
		el: '#app',
		data: {
			title: 'Hello Vue!',
			text: 'Lorem ipsum dolor',
			filename: 'filename'
		},
		methods: {
			showPopup: function() {

			}
		}
	});

	console.log(window.url);
	app.showPopup();
});

let table = document.getElementById("table_documents");
request.get("http://localhost:7000/get_files").then(function(tmp) {
	console.log(tmp);
});
