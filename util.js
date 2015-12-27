function getOpts(callback)
{
	chrome.storage.sync.get(null, function(opts) {
		if(chrome.runtime.error) return;

		opts.nintendoId = opts.nintendoId || '';
		opts.clickOption = opts.clickOption || 'open';
		opts.updateOption = opts.updateOption || 'hourly';

		callback(opts);
	});
}