window.$ = jQuery;
window.jQuery = jQuery;

$(document).ready(function(){
    $('.slider').slick();
	$('a[href^="#"]').on('click', function(event) {
	event.preventDefault();
	var hash = this.hash;
	$('html, body').animate({
	  scrollTop: $(hash).offset().top
	}, 700);
   });
    $(window).scroll(function() {
        let scrollLink = $(".scroll-section");
		let scrollbarLocation = $(this).scrollTop();
		scrollLink.each(function() {
			let sectionOffset = $(this.hash).offset().top;
			if (sectionOffset <= scrollbarLocation) {
				$(this)
					.parent()
					.addClass("active");
				$(this)
					.parent()
					.siblings()
					.removeClass("active");
			}
		});
	});
	history.pushState('', document.title, window.location.pathname);

	const popupLinks = document.querySelectorAll('.popup-link');
	const body = document.querySelector('body');
	const lockPadding = document.querySelectorAll('.lock-padding');
	
	let unlock = true;

	const timeout = 600;
	
	if (popupLinks.length > 0) {
		$(document).on('touchmove',function(e){
			e.preventDefault();
		  });
		for (let index = 0; index < popupLinks.length; index++) {
			const popupLink = popupLinks[index];
			popupLink.addEventListener("click", function (e) {
				const popupName = popupLink.getAttribute('href').replace('#', '');
				const curentPopup = document.getElementById(popupName);
				popupOpen(curentPopup);
				e.preventDefault();
			});
		}
	}
	const popupCloseIcon = document.querySelectorAll('.close-popup');
	if (popupCloseIcon.length > 0) {
		for (let index = 0; index < popupCloseIcon.length; index ++) {
			const el = popupCloseIcon[index];
			el.addEventListener('click', function (e) {
				popupClose(el.closest('.popup'));
				e.preventDefault();
			})
		}
	}
	function popupOpen(curentPopup) {
		if (curentPopup && unlock) {
			const popupActive = document.querySelector('.popup.open');
			if (popupActive) {
				popupClose(popupActive, false);
			} else {
				bodyLock();
			}
			curentPopup.classList.add('open');
			curentPopup.addEventListener("click", function (e) {
				if (!e.target.closest('.popup__content')) {
					popupClose(e.target.closest('.popup'));
				}
			});
		}
	}

	function popupClose(popupActive, doUnlock = true) {
		if (unlock) {
			popupActive.classList.remove('open');
			if (doUnlock) {
				bodyUnLock();
			}
		}
	}

	function bodyLock() {
		const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

		if (lockPadding.length > 0) {
			for (let index = 0; index < lockPadding.length; index++) {
				const el = lockPadding[index];
				/* el.style.paddingLeft = lockPaddingValue; */
				el.style.paddingRight = lockPaddingValue;
			}
		}
		/* body.style.paddingLeft = lockPaddingValue; */
		body.style.paddingRight = lockPaddingValue;
		body.classList.add('lock');

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, timeout);
	}
	function bodyUnLock() {
		setTimeout(function() {
			if (lockPadding.length > 0) {
				for (let index = 0; index < lockPadding.length; index++) {
					const el = lockPadding[index];
					/* el.style.paddingLeft = '0px'; */
					el.style.paddingRight = '0px';
				}
			}
			/* body.style.paddingLeft = '0px'; */
			body.style.paddingRight = '0px';
			body.classList.remove('lock');
		}, timeout);
	}
	document.addEventListener('keydown', function (e) {
		if (e.which === 27) {
			const popupActive = document.querySelector('.popup.open');
			popupClose(popupActive);
		}
	});

	(function () {
		if (!Element.prototype.closest) {
			Element.prototype.closest = function (css) {
				var node = this;
				while (node) {
					if (node.matches(css)) return node;
					else node = node.parentElement;
				}
				return null;
			};
		}
	})();
	(function (){
		if (!Element.prototype.matches) {
			Element.prototype.matches = Element.prototype.matchesSelector ||
				Element.prototype.webkitMatchesSelector ||
				Element.prototype.mozMatchesSelector ||
				Element.prototype.msMatchesSellector;
		}
	})();


	//form-js
});
document.addEventListener('DOMContentLoaded', function () {
	const form = document.getElementById('form');
	form.addEventListener('submit', formSend);

	async function formSend(e) {
		e.preventDefault();

		let error = formValidate(form);

		let formData = new FormData(form);

		if (error===0) {
			form.classList.add('_sending');
			let response = await fetch('sendmail.php', {
				method: 'POST',
				body: formData
			});
			if(response.ok) {
				let result = await response.json();
				alert(result.message);
				form.reset();
				form.classList.remove('_sending');
			} else {
				alert("Ошибка");
				form.classList.remove('_sending');
			}
		}
	}

	function formValidate(form) {
		let error = 0;
		let formReq = document.querySelectorAll('._req');
		
		for (let index = 0; index < formReq.length; index++) {
			const input = formReq[index];
			formRemoveError(input);

			if (input.classList.contains('_phone')) {
				if (phoneTest(input)) {
					formAddError(input);
					error++;
				}
			} else if(input.getAttribute("type") === "checkbox" && input.checked === false) {
				formAddError(input);
				error++;
			} else {
				if (input.value === '' || input.value === '+380'){
					formAddError(input);
					error++;
				}
			}
		}
		return error;
	}
	function formAddError(input) {
		input.parentElement.classList.add('_error');
		input.classList.add('_error');
	}
	function formRemoveError(input) {
		input.parentElement.classList.remove('_error');
		input.classList.remove('_error');
	}
	function phoneTest(input) {
		return !/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/.test(input.value);
	}

	//options
	document.querySelector('.press-option').addEventListener('click', () => {
		styleDisplay = document.querySelector('.option__content').style.display;
		el = document.querySelector('.option__img');
		if(styleDisplay === 'block') {
			document.querySelector('.option__content').style.display = 'none';
			el.classList.remove('active__img');
		} else {
			document.querySelector('.option__content').style.display = 'block';
			el.classList.add('active__img');
		}
	});
});

