$(document).ready(function(){
let heightHeader = $(".header").height();
	let heightMenu = $(".header__nav").height();
	$(window).scroll(function() {
		let currentPosition = $(window).scrollTop();
		if (currentPosition >= heightHeader - heightMenu) {
			$(".header__nav").addClass("fixed");
			$(".header").css("padding-bottom", heightMenu+25);
		} else {
			$(".header__nav").removeClass("fixed");
			$(".header").css("padding-bottom", "0");
		}
	});
});