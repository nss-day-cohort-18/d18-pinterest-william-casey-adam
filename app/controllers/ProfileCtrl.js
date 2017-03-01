"use strict";

app.controller("ProfileCtrl", function($scope, $location) {

	$("#boardsBtn").click(function() {
		$("#boardsBtn").removeClass("active");
		$("#pinsBtn").addClass("active");
		$("#tab1").addClass("active");
		$("#tab2").removeClass("active");
	});

	$("#pinsBtn").click(function() {
		$("#pinsBtn").removeClass("active");
		$("#boardsBtn").addClass("active");
		$("#tab1").removeClass("active");
		$("#tab2").addClass("active");
	});


});