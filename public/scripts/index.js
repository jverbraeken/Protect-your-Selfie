"use strict"

const Vue = require('vue');

document.addEventListener('DOMContentLoaded', function() {

	var app = new Vue({
		el: '#app',
		data: {
			title: 'Hello Vue!',
			text: 'Lorem ipsum dolor'
		}
	});
});
