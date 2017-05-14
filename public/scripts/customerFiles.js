"use strict"

const Vue = require('vue');

var app = new Vue({
	el: '#organization-files-of-customer',
	data: {
		files: []
	},
	methods: {
		loadData: function() {
			$.ajax({method: 'get', url: '/getOtherFiles?id=1'}).done(res => {
				let files = JSON.parse(res);
				console.log(files);
				this.files = files;
			}).fail(e => {
				console.log('failed', e);
			});
		}
	}
});

app.loadData();
