var viewModel;
$(document).ready(function() {

	function VM() {
		this.config = ko.observable($('#config').val());
		this.font = ko.observable('TeX');
		this.content = ko.observable($('#content-area').val());
		this.contentCSS = ko.observable('sans');
		this.squareFontSize = ko.observable(4000);
		this.fontSize = ko.computed(function(){
			return Math.round(Math.pow(this.squareFontSize()/1000,2));
		},this);
		ko.computed(function() {
			$('#content').css({'font-size':this.fontSize()+'px'});
		},this);
		ko.computed(function() {
			this.fontSize();

			if(window.MathJax && MathJax.Hub)
				MathJax.Hub.Rerender();
		},this).extend({throttle:400});

		ko.computed(function() {
			this.contentCSS();
			var config = JSON.parse(this.config());
			window.MathJax = $.extend({},config,{SVG:{font:this.font()},"HTML-CSS":{webfont:this.font()}});
			$('script[id="mathjax"]').remove();
			$('body').append('<script id="mathjax" type="text/javascript" src="http://beta.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_SVG.js"></script>');
			$('#content').html(this.content());
		},this);
	}
	VM.prototype = {
		fonts: [
			{name: 'TeX', code: 'TeX'},
			{name: 'STIX', code: 'STIX-Web'},
			{name: 'Neo Euler', code: 'Neo-Euler'},
			{name: 'Asana', code: 'Asana-Math'},
			{name: 'Gyre Pagella', code: 'Gyre-Pagella'},
			{name: 'Gyre Termes', code: 'Gyre-Termes'},
			{name: 'Latin Modern', code: 'Latin-Modern'},
		]
	}
	
	viewModel = new VM();
	ko.applyBindings(viewModel);
});
