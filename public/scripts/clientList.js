"use strict"

const Vue = require('vue');

var app = new Vue({
	el: '#clientListTable',
	data: {
		clients: [
			{
				name: "Mike Andrew",
				dateSince: "23-02-2017",
				link: "clientProfile.html"
			},
			{
				name: "Eric Cornelissen",
				dateSince: "06-01-2017"
			},
			{
				name: "Joost Verbraeken",
				dateSince: "12-04-2017"
			},
			{
				name: "Jody Liu",
				dateSince: "30-11-2016"
			},
			{
				name: "Cornel de Vroomen",
				dateSince: "19-04-2017"
			}
		]
	}
});