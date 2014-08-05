// ------------------------------------------------------------------------------------
//
// Fading through all content inside the class 'divfader'
//
// ------------------------------------------------------------------------------------
// ----------------------- INSTRUCTIONS -----------------------------------------------
// For the script to work properly, use class "divfader" as container.
// Place divs/objects you want to include in the slider in class "divfader-content".
// Controls/dots will be created in class "divfader-controller".
// For next/previous-controls, use class "divfader-next" and "divfader-previous".
// ------------------------------------------------------------------------------------


// Playback variables
var autoplay = true;
var showControls = true;
var fadeTimer = 400;
var delay = 2000;

var content = $('.divfader-content').children().hide();
var controls;
var	current = content.length-1;
var timeout;


// ------------------------
// Initialization
// ------------------------
// Onload
$(function() {
	if (showControls) {
		initializeControls();
	}

	if (autoplay) cycle();
	else showSlide(0);
});

// Initialize controls (dots)
function initializeControls() {
	// Add divfader-controller to DOM (if it doesn't exist)
	if (!$('.divfader').children().hasClass('divfader-controller')) {
		$('.divfader').append('<div class="divfader-controller"></div>');
	}

	// Add controls to DOM
	for (n = 0; n < content.length; n++) {
		$('.divfader-controller').append('<div class="divfader-control"></div>');
	}

	// Save controls
	controls = $('.divfader-controller').children();
}


// ------------------------
// Actions
// ------------------------
// Controller clicked (dot)
$('.divfader-controller').on('click',function(event){
	abortCycle();
    showSlide($(event.target).index(), true);
});

// Next clicked
$('.divfader-next').on('click',function(event){
	abortCycle();
    nextSlide(true);
});

// Previous clicked
$('.divfader-previous').on('click',function(event){
	abortCycle();
    previousSlide(true);
});

// Cycle through slides
function cycle() {
	// Fade in next slide, recursively
    nextSlide();
    if (autoplay) {
    	timeout = setTimeout(cycle, delay+fadeTimer);
    }
}


// ------------------------
// Playback functions
// ------------------------
// Show specific slide
// Responsive will ensure that controls are updated instantly
function showSlide(slideId, responsive) {
	// Stop all other animations
	content.stop();

	// Responsive controls
	if (responsive) setActiveControl(slideId);

	// Fade out previous slide
	slide = content.eq(current);
	slide.fadeOut(fadeTimer, function() {
		current = slideId;

		// Update controls normally
		if (!responsive) setActiveControl(slideId);

		// Fade in
		slide = content.eq(slideId);
	    slide.fadeIn(fadeTimer);
	});
}

// Show next slide
// Responsive will ensure that controls are updated instantly
function nextSlide(responsive) {
	showSlide((current+1) % content.length, responsive);
}

// Show previous slide
// Responsive will ensure that controls are updated instantly
function previousSlide(responsive) {
	showSlide((current-1) % content.length, responsive);
}

// Set active control (dot)
function setActiveControl(id) {
	if (showControls){
		controls.removeClass("divfader-control-active").addClass("divfader-control");
		controls.eq(id).removeClass("divfader-control").addClass("divfader-control-active");
	}
}

// Abort autoplay cycle
function abortCycle() {
	autoplay = false;
	clearTimeout(timeout);
}
