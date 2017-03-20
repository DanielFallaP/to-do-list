/**
 * Shows toast notification.
 */
function showToast(message, delay){
	Materialize.toast(message, delay, 'rounded');
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

function setInlineEditor(){
	setTimeout(function () {
		new MediumEditor('.editable');
	}, 0);
}

function setListAnimation(el, left){
	if (el){
		setTimeout(function () {
			showStaggered(el, left);
		}, 0);
	}
}

function setFadeInAnimation(el){
	if (el){
		setTimeout(function () {
			Materialize.fadeInImage($(el));
		}, 0);
	}
}

function showStaggered(selectorOrEl, left){
	var element;
    if (typeof(selectorOrEl) === 'string') {
      element = $(selectorOrEl);
    } else if (typeof(selectorOrEl) === 'object') {
      element = selectorOrEl;
    } else {
      return;
    }
    var time = 0;
    element.find('li').velocity(
        { translateX: left? "-300px": "300px"},
        { duration: 0 });

    element.find('li').each(function() {
      $(this).velocity(
        { opacity: "1", translateX: "0"},
        { duration: 800, delay: time, easing: [60, 10] });
      time += 120;
    });
}

function readjustPanels(){
	setTimeout(function(){
		var left = document.getElementById('leftBucket');
		var right = document.getElementById('rightBucket');
		var maxHeight = Math.max($('#leftBucket').height(), $('#rightBucket').height());
		left.style.height = maxHeight + 'px';
		right.style.height = maxHeight + 'px';
	},1000);
}