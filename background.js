chrome.runtime.onMessage.addListener(function(request) {
	if(request && request.id === 'update') updateAll();
});

chrome.runtime.onInstalled.addListener(function (object) {
	chrome.runtime.openOptionsPage();
});

chrome.browserAction.onClicked.addListener(onButtonClick);

var autoUpdateIntervalId = null;
var opts = null;

function updateAll() {
	getOpts(function(options) {
		opts = options;

		if(opts.nintendoId === '')
		{
			setText('?');
		}
		else
		{
			getStarCount(opts.nintendoId, function(stars) {
				setText(stars);
			});
		}

		setAutoUpdate(opts.updateOption);
		clickOption = opts.clickOption;
	});
}

function setAutoUpdate(updateInterval) {
	var ms = null;

	clearInterval(autoUpdateIntervalId);

	if(updateInterval === 'never') return;

	switch(updateInterval)
	{
		case '5min':   ms = 300000;  break;
		case '10min':  ms = 600000;  break;
		case '30min':  ms = 1800000; break;
		case 'hourly': ms = 3600000; break;
	}

	autoUpdateIntervalId = setInterval(function() {
		getStarCount(opts.nintendoId, function(stars) {
			setText(stars);
		});
	}, ms);
}

function setText(text) {
	chrome.browserAction.setBadgeText({text:text.toString()});
}

function getStarCount(nintendoId, callback) {
	if(nintendoId === '') return;

	var request = new XMLHttpRequest();

	request.addEventListener('load', function(event) {
		try
		{
			var stars = parseInt(Array.prototype.map.call(request.responseXML.body.getElementsByClassName('star')[0].getElementsByClassName('typography'), function(n) { return n.className.substr(n.className.indexOf('-') + 1) }).join(''),10)
			callback(stars);
		}
		catch(e)
		{
			callback(null);
		}
	});

	request.open('GET', 'https://supermariomakerbookmark.nintendo.net/profile/' + nintendoId, true);
	request.responseType = 'document';
	request.send();
}

function onButtonClick() {
	if(opts.nintendoId === '')
	{
		chrome.runtime.openOptionsPage();
		return;
	}

	if(opts.clickOption === 'update')
	{
		startLoadingAnimation();
		getStarCount(opts.nintendoId, function(stars) {
			stopLoadingAnimation();
			setText(stars);
		});
	}
	else
	{
		chrome.tabs.create({ url: 'https://supermariomakerbookmark.nintendo.net/profile/' + opts.nintendoId });

		getStarCount(opts.nintendoId, function(stars) {
			setText(stars);
		});
	}
}

setText('...');
updateAll();