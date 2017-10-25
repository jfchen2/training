'use strict';

// PLACEHOLDER

// SETUP

// $('#activeExtremeColdWeatherAlert').closest('article.media').addClass('cold-alerts').hide();

// OPENDATA

function activeExtremeColdWeatherAlertSuccess(data, textStatus, jqXHR) {
	console.log("in activeExtremeColdWeatherAlertSuccess");

	if (data && data['date'] && data['code'] && data['text']) {
		var now = new Date();
		now.setHours(0, 0, 0, 0);

		var alert_date = new Date(data['date']);
		alert_date.setHours(0, 0, 0, 0);

		if (alert_date.getTime() == now.getTime()) {

			var month_array = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
			var dateString = month_array[alert_date.getMonth()] + ' ' + alert_date.getDate() + ', ' + alert_date.getFullYear();

			var message;

			if (data['code'] == 'ECWAT') {
				message = '<p style="padding-left: 63px;"><img alt="" src="https://web.toronto.ca/wp-content/themes/cot/img/logo.svg" height="48" width="53" style="float: left; margin-left: -63px;"> <strong>Extreme Cold Weather Alert</strong><br>' + dateString + ', ' + data['text'] + '</p>';
			} else {
				message = '<p><strong>Extreme Cold Weather Alert</strong><br>' + dateString + ', ' + data['text'] + '</p>';
			}

			$('#activeExtremeColdWeatherAlert').append(message);
		}
	}
	console.log("leaving activeExtremeColdWeatherAlertSuccess");
}

$(function () {
	$.ajax('/data/some_data.json', {
		cache: true,
		dataType: 'jsonp',
		success: activeExtremeColdWeatherAlertSuccess
	});
});