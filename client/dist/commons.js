/**
 * Shows toast notification.
 */
function showToast(message, delay){
	Materialize.toast(message, delay
	);
}

/**
 * Sets inline editor for appropriate elements.
 */
function setInlineEditor(){
	setTimeout(function () {
		new MediumEditor('.editable');
	}, 0);
}

/**
 * Sets staggered animation for list.
 * Makes it appear from LHS or RHS according 
 * to parameter.
 */
function setListAnimation(el, left){
	if (el){
		setTimeout(function () {
			showStaggered(el, left);
		}, 0);
	}
}

/**
 * Sets fade in animation.
 */
function setFadeInAnimation(el){
	if (el){
		setTimeout(function () {
			Materialize.fadeInImage($(el));
		}, 0);
	}
}

/**
 * Applies staggered animation to list.
 */
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

/**
 * Shows only left or right bucket border
 * according to the tallest one.
 */
function readjustPanels(){
	setTimeout(function(){
		var left = document.getElementById('leftBucket');
		var right = document.getElementById('rightBucket');
		if ($('#leftBucket').height() > $('#rightBucket').height()){
			left.className = "col s6 rightDivider";
			right.className = "col s6";	
		}
		else{
			right.className = "col s6 leftDivider";
			left.className = "col s6";
		}
	}, 0);
}

/**
 * Gets the target of a drag and drop operation.
 */
function getTarget(x){
	if ($(document).width() / 2 > x)
		return 'leftBucket';
	else
		return 'rightBucket';
}