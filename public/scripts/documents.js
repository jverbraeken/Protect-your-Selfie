"use strict"

const Vue = require('vue');

var app = new Vue({
	el: '#documentListTable',
	data: {
		documents: []
	},
	methods: {
		loadData: function() {
			$.ajax({method: 'get', url: '/getOwnFiles?id=1'}).done(res => {
				let documents = JSON.parse(res);
				console.log(documents);
				this.documents = documents;
			}).fail(e => {
				console.log('failed', e);
			});
		}
	}
});

app.loadData();