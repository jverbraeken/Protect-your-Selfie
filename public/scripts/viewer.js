"use strict"

const Vue = require('vue');

var app = new Vue({
	el: '#viewerTableRow',
	data: {
		views: []
	},
	methods: {
		loadData: function() {
			$.ajax({method: 'get', url: '/getOwnFiles?id=1'}).done(res => {
				let documents = JSON.parse(res);
				this.documents = documents;
			}).fail(e => {
				console.log('failed', e);
			});
		}
	}
});

app.loadData();
