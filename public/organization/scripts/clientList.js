"use strict"

const Vue = require('vue');

var app = new Vue({
	el: '#clientListTable',
	data: {
		clients: [
			{
				name: "Mike Andrew"
			},
			{
				name: "Eric Cornelsisen"
			},
			{
				name: "Joost Verbraeken"
			},
			{
				name: "CooleCornel"
			}
		]
	},
	methods: {
		showPopup: function() {
			
		}
	}
});
console.log(app.clients)