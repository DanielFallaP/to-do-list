/**
 * Shows toast notification.
 */
function showToast(message,delay){
	Materialize.toast(message,delay);
}

/**
 * Sets ScrollFire option for the video list.
 */
function setScrollFire(offset, callback){
	var options = [
		{selector: '#videoList', offset: offset, callback: callback}
	]
	Materialize.scrollFire(options);
}

/**
 * Pauses video playback.
 */
function stopPlayback(videoId){
	if (videoId)
		document.getElementById(videoId).pause();
}

function setAnimation(el){
	if (el)
		Materialize.fadeInImage($(el));
}

function setCollapseButton(el){
	$(".button-collapse").sideNav();
}