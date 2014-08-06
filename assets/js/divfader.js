// ------------------------------------------------------------------------------------
//
// DivFader - A very simple, fading content slider.
//
// ------------------------------------------------------------------------------------
// ----------------------- INSTRUCTIONS -----------------------------------------------
// Initialize with the desired container
//		(e.g. divfader('.divfader') to contain fader in div with class 'divfader')
//
// Place divs/objects you want to include in the slider in class "divfader-content".
// Controls/dots will be created in class "divfader-controller".
// For next/previous-controls, use class "divfader-next" and "divfader-previous".
//
// Use public variables autoplay, fadeTimer and delay to configure.
// ------------------------------------------------------------------------------------

function divfader(container) 
{
	// Public playback variables
	this.autoplay = true;
	this.fadeTimer = 400;
	this.delay = 2000;

	var containers = {
		// Container classes
		content: '.divfader-content',
		controller: '.divfader-controller',
		next: '.divfader-next',
		previous: '.divfader-previous',
		control: '.divfader-control'
	}
	var controlClasses = {
		// CSS Clases used to differentiate active and inactive controls
		active: 'divfader-control-active',
		inactive: 'divfader-control'
	}

	var that = this; // <--- I don't like the web.

	var container = $(container);
	var content = container.children(containers.content).children().hide();
	var controller = container.children(containers.controller);
	var controls;
	var controlNext = container.children(containers.next);
	var controlPrevious = container.children(containers.previous);

	var	current = content.length-1;
	var timeout;


	// ------------------------
	// Initialization
	// ------------------------
	// Onload
	$(document).ready(function() {
		initializeControls();

		if (that.autoplay) cycle();
		else showSlide(0);
	});


	// Initialize controls (dots)
	function initializeControls() {
		// Remove prefix (.) from container class
		var className = containers.control;
		className.replace('.', '');

		// Add controls to DOM
		for (n = 0; n < content.length; n++) {
			controller.append('<div class="' + className +'"></div>');
		}

		// Save controls
		controls = controller.children();
	}


	// ------------------------
	// Actions
	// ------------------------
	// Controller clicked (dot)
	controller.on('click', '*', function(event){
		abortCycle();
	    showSlide($(event.target).index(), true);
	});

	// Next clicked
	controlNext.on('click',function(event){
		abortCycle();
	    nextSlide(true);
	});

	// Previous clicked
	controlPrevious.on('click',function(event){
		abortCycle();
	    previousSlide(true);
	});

	// Cycle through slides
	function cycle() {
		// Fade in next slide, recursively
	    nextSlide();
	    if (that.autoplay) {
	    	timeout = setTimeout(cycle, that.delay+that.fadeTimer);
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

		// Responsive controls (update control instantly)
		if (responsive) setActiveControl(slideId);

		// Only fade out for new slides
		if (slideId != current) {
			// Fade out previous slide
			slide = content.eq(current);
			slide.fadeOut(that.fadeTimer, fadeIn);
		}
		else fadeIn();

		function fadeIn() {
			current = slideId;

			// Update controls normally
			if (!responsive) setActiveControl(slideId);

			// Fade in
			slide = content.eq(slideId);
		    slide.fadeIn(that.fadeTimer);
		};
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
		controls.removeClass(controlClasses.active).addClass(controlClasses.inactive);
		controls.eq(id).removeClass(controlClasses.inactive).addClass(controlClasses.active);
	}

	// Abort that.autoplay cycle
	function abortCycle() {
		that.autoplay = false;
		clearTimeout(timeout);
	}
}
