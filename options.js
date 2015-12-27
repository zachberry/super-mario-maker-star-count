var nintendoIdEl = document.getElementById('nintendo-id');
var clickOptionsEl = document.getElementById('click-options');
var updateOptionsEl = document.getElementById('update-options');
var submitEl = document.getElementById('submit');

getOpts(function(opts) {
	nintendoIdEl.value = opts.nintendoId;
	clickOptionsEl.value = opts.clickOption;
	updateOptionsEl.value = opts.updateOption;
})

submitEl.addEventListener('click', function(event) {
	chrome.storage.sync.set({
		nintendoId: nintendoIdEl.value,
		clickOption: clickOptionsEl.value,
		updateOption: updateOptionsEl.value
	});

	chrome.extension.sendMessage({
		id: 'update'
	});

	window.close();
});

setTimeout(function() {
	nintendoIdEl.focus();
	nintendoIdEl.select();
}, 1);