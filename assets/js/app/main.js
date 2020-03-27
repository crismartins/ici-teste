
jQuery(document).ready(function ($) {


	$(".theme-switcher").on('click', function (event) {
		$(this).toggleClass('is-active');
		$("body").toggleClass('black-theme');
		event.preventDefault();
	});

	window.onscroll = function () { myFunction() };

	var header = document.getElementById("header");
	var sticky = header.offsetTop;

	function myFunction() {
		if (window.pageYOffset > sticky) {
			header.classList.add("sticky");
		} else {
			header.classList.remove("sticky");
		}
	}

	$(".font-normal").on('click', function (event) {
		$('body').css("font-size", "14px");
		event.preventDefault();
	});
	$(".font-medium").on('click', function (event) {
		$('body').css("font-size", "16px");
		event.preventDefault();
	});
	$(".font-large").on('click', function (event) {
		$('body').css("font-size", "20px");
		event.preventDefault();
	});

	// $("#size").change(function() {
	// 	$('.changeMe').css("font-size", $(this).val() + "px");
	// });

});


