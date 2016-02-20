var callOrderLink = document.querySelector(".map-contacts-btn");
var callOrderWrap = document.querySelector(".popup-callorder-wrap");
var callOrderPopup = callOrderWrap.querySelector(".popup-callorder-content");
var callOrderClose = callOrderWrap.querySelector(".popup-closer");
var callOrderOverlay = callOrderWrap.querySelector(".popup-overlay");
var form = callOrderWrap.querySelector("form");
var userName = callOrderWrap.querySelector("[name=user-name]");
var email = callOrderWrap.querySelector("[name=email]");
var info = callOrderWrap.querySelector("[name=info]");
var userNameStorage = localStorage.getItem("userName");
var emailStorage = localStorage.getItem("email");

callOrderLink.addEventListener("click", function(event) {
	event.preventDefault();
	callOrderWrap.classList.add("popup-wrap-show");
	
	if (userNameStorage && emailStorage) {
		userName.value = userNameStorage;
		email.value = emailStorage;
		info.focus();
	} else {
		userName.focus();
	}
	
});

callOrderClose.addEventListener("click", function(event) {
	event.preventDefault();
	callOrderWrap.classList.remove("popup-wrap-show");
	callOrderPopup.classList.remove("popup-error");
});

callOrderOverlay.addEventListener("click", function(event) {
	event.preventDefault();
	callOrderWrap.classList.remove("popup-wrap-show");
	callOrderPopup.classList.remove("popup-error");
});

form.addEventListener("submit", function(event) {
	if (!userName.value || !email.value || !info.value) {
		event.preventDefault();
		callOrderPopup.classList.remove("popup-error");
		callOrderPopup.offsetWidth = callOrderPopup.offsetWidth;
		callOrderPopup.classList.add("popup-error");
	} else {
		localStorage.setItem("userName", userName.value);
		localStorage.setItem("email", email.value);
	}
});

window.addEventListener("keydown", function(event) {
	if (event.keyCode === 27) {
		if (callOrderWrap.classList.contains("popup-wrap-show")) {
			callOrderWrap.classList.remove("popup-wrap-show");
			callOrderPopup.classList.remove("popup-error");
		}
	}
});


var myMap;
ymaps.ready(init);

function init () {
	myMap = new ymaps.Map('yandex_map', {
	center: [59.940128, 30.328494],
	controls: ['zoomControl'],
	zoom: 16
	});
	myMap.geoObjects.add(new ymaps.Placemark( [59.93855426, 30.32247950], {
		balloonContentHeader: '<strong>МОРОЖЕНКА</strong>'
		, balloonContentBody: '191186, Санкт-Петербург,<br> ул. Б. Конюшенная, д. 19/8'
		, balloonContentFooter: 'тел. +7 (812) 275-75-75'
		}, {
			iconLayout: 'default#image',
			iconImageSize: [218, 142],
			iconImageHref: 'img/pin.png',
			iconImageOffset: [-15, -155]
		}));
	myMap.behaviors.disable('scrollZoom');
}
