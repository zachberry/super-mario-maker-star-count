var loadingIntervalId = null;

function startLoadingAnimation() {
	stopLoadingAnimation();

	setText('');

	var images = ['loading1.png', 'loading2.png', 'loading3.png', 'loading4.png'];
	var curIndex = 0;
	var ticks = 0;

	loadingIntervalId = window.setInterval(function() {
		chrome.browserAction.setIcon({path:{
			19: images[curIndex],
			38: images[curIndex]
		}});
		curIndex = (curIndex + 1) % images.length;
		ticks++;

		if(ticks > 4)
		{
			setText('Error');
			stopLoadingAnimation();
		}
	}, 300);
}

function stopLoadingAnimation() {
	if(loadingIntervalId === null) return;

	clearInterval(loadingIntervalId);
	loadingIntervalId = null;
	chrome.browserAction.setIcon({path:{
			19: 'icon.png',
			38: 'icon.png'
		}});
}