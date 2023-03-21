document.addEventListener('DOMContentLoaded', () => {
	// burger
	let burger = document.querySelector('.burger');
	let menu = document.querySelector('.header__nav-top');
	let secondMenu = document.querySelector('.header__nav-bottom');
	let menuLinks = document.querySelectorAll('.nav__link');
	burger.addEventListener('click', function() {
		burger.classList.toggle('burger--active');
		menu.classList.toggle('header__nav-top--active');
		secondMenu.classList.toggle('header__nav-bottom--active');
		document.body.classList.toggle('stop-scroll');
	});
	menuLinks.forEach(function(element) {
		element.addEventListener('click', function() {
			burger.classList.remove('burger--active');
			menu.classList.remove('header__nav-top--active');
			secondMenu.classList.remove('header__nav-bottom--active');
			document.body.classList.remove('stop-scroll');
		});
	});
	// search
	let searchBtn = document.querySelector('.search__btn');
	let searchInp = document.querySelector('.search__inp');
	searchBtn.addEventListener('click', function() {
		searchInp.classList.toggle('search__inp--active');
	});
	// header
	let onTheAir = document.querySelector('.player-box__btn');
	let air = document.querySelector('.header__player-wrap');
	onTheAir.addEventListener('click', function() {
		onTheAir.classList.toggle('player-box__btn--active');
		air.classList.toggle('header__player-wrap--active');
	});
	// show more podcasts
	const mq = window.matchMedia('(max-width: 576px)')
	const btnMore = document.querySelector('.podcasts__more-btn');
	const podcastsItemLength = document.querySelectorAll('.podcasts__item').length;
	function clickShowMore(startQuantity) {
		let items = startQuantity;
		btnMore.addEventListener('click', () => {
			items += 4;
			const array = Array.from(document.querySelector('.podcasts__list').children);
			const visItems = array.slice(0, items);
			visItems.forEach(el => {el.classList.add('podcasts__item--visible')});
			if (visItems.length === podcastsItemLength) {
				btnMore.classList.add('podcasts__center--hidden');
			};
		});
	}
	if (mq.matches) {
			// ширина окна меньше, чем 576px
			clickShowMore(4)
	} else {
			// ширина окна больше, чем 576px
			clickShowMore(8)
	}
	// select - transfers
	const transfersSelect = () => {
		const element = document.querySelector('#transfers__select');
		const choices = new Choices(element, {
			searchEnabled: false,
			shouldSort: false,
			allowHTML: false,
		});
		let ariaLabel = element.getAttribute('aria-label');
		element.closest('.choices').setAttribute('aria-label', ariaLabel);
	};
	transfersSelect();
	// accordion - guests
	new Accordion('.accordion-list', {
		elementClass: 'accordion',
		triggerClass: 'accordion__control',
		panelClass: 'accordion__content',
		activeClass: 'accordion--active',
	});
	// tabs - guests
	let tabsBtn = document.querySelectorAll('.accordion__link');
	let tabsSidebar = document.querySelectorAll('.sidebar__blog');
	tabsBtn.forEach(function(element){
		element.addEventListener('click', function(e){
			const target = e.currentTarget.dataset.target;
			tabsBtn.forEach(function(btn){ btn.classList.remove('accordion__link--active')});
			e.currentTarget.classList.add('accordion__link--active');
			if (window.matchMedia('(max-width: 576px)').matches) {
				setTimeout(function () {
					let element = document.getElementById(target);
      		let headerOffset = 28;
       		let elementPosition = element.getBoundingClientRect().top;
      		let offsetPosition = elementPosition + window.pageYOffset - headerOffset;
					window.scrollTo({
							top: offsetPosition,
							behavior: "smooth"
					});
				}, 350);
			}
			tabsSidebar.forEach(function(element){ element.classList.remove('sidebar__blog--active')});
			document.querySelector(`[data-sidebar="${target}"]`).classList.add('sidebar__blog--active');
		});
	});
	// scroll links
	const header = document.querySelector('.header')
	const anchors = header.querySelectorAll('a[href*="#"]')
	for (let anchor of anchors) {
		anchor.addEventListener('click', function (e) {
			e.preventDefault()
			const blockID = anchor.getAttribute('href').substr(1)
			document.getElementById(blockID).scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			})
		})
	}
	// tabs - playlists
	let tabsRadio = document.querySelectorAll('.playlists__radio');
	let tabsPage = document.querySelectorAll('.blog__page');
	tabsRadio.forEach(function(element){
		element.addEventListener('click', function(e){
			const target = e.currentTarget.dataset.target;
			tabsRadio.forEach(function(btn){ btn.classList.remove('playlists__radio--active')});
			e.currentTarget.classList.add('playlists__radio--active');
			tabsPage.forEach(function(element){ element.classList.remove('blog__page--active')});
			document.querySelector(`[data-list="${target}"]`).classList.add('blog__page--active');
		});
	});
	// simpleBar - playlists
	let simpleBar = null;
	if (window.matchMedia('(max-width: 576px)').matches) {
		simpleBar = new SimpleBar(document.getElementById('listRadio'));
	}
	window.addEventListener('resize', function() {
		if(document.documentElement.clientWidth < 577) {
			simpleBar = new SimpleBar(document.getElementById('listRadio'));
		}
	});

	// swiper - about
	let swiper = new Swiper('.swiper', {
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		breakpoints: {
			1201: {
				slidesPerView: 4,
				spaceBetween: 30,
				slidesOffsetBefore: 0,
				slidesOffsetAfter: 0,
			},
			577: {
				slidesPerView: 2,
				spaceBetween: 30,
				slidesOffsetBefore: 0,
				slidesOffsetAfter: 0,
			},
			340: {
				slidesPerView: 2.25,
				slidesOffsetBefore: 32,
				slidesOffsetAfter: 32,
			},
		},
		slidesOffsetBefore: 32,
		slidesOffsetAfter: 32,
		slidesPerView: 2.556,
		spaceBetween: 20,
		grabCursor: true,
		loop: false,
	});
	// form validation
	let validationForms = function(selector, rules, messages, successModal, yaGoal) {
		new window.JustValidate(selector, {
			colorWrong: '#D52B1E',
			rules: rules,
			messages: messages,
			submitHandler: function(form) {
				let formData = new FormData(form);
				let xhr = new XMLHttpRequest();
				xhr.onreadystatechange = function() {
					if (xhr.readyState === 4) {
						if (xhr.status === 200) {
							console.log('Отправлено');
							const modalForm = document.querySelector('.modal-form')
							const modalOverlay = document.querySelector('.modal-overlay')
							modalOverlay.classList.add('modal-overlay--visible')
							modalForm.classList.add('modal-form--visible')
							modalOverlay.addEventListener('click', (e) => {
								if (e.target == modalOverlay) {
									modalOverlay.classList.remove('modal-overlay--visible')
									modalForm.classList.remove('modal-form--visible')
								}
							})
							document.addEventListener('keyup', function(e) {
								if (e.key === "Escape") {
									closeModal()
								}
							});
						}
					}
				}
				xhr.open('POST', './php/mail.php', true)
				xhr.send(formData)
				form.reset()
			}
		})
	}
	// form - modal
	validationForms('.modal__form', {login: {required: true},  password: {required: true, strength: {default: true}}}, {login: {required: 'Вы не ввели login'}, password: {required: 'Вы не ввели пароль', strength: 'Одна заглавная буква, одна строчная буква и одна цифра'}},'thanks-popup', 'send goal')
	// form - about
	validationForms('.about__form', {message: {required: true}, name: {required: true, minLength: 3, maxLength: 10}, email: {required: true, email: true}, check: {required: true}}, {message: {required: 'Пожалуйста, оставьте отзыв'},name: {minLength: 'Имя слишком короткое', maxLength: 'Имя слишком длинное', required: 'Вы не ввели имя'}, email: {required: 'Вы не ввели e-mail', email: 'Провете Email'}, check: {required: ' '}}, 'thanks-popup', 'send goal')
	// modal
	const visitBtn = document.querySelector('.header__visit');
	const modal = document.querySelector('.modal');
	const modalWindow = document.querySelector('.modal__window');
	const closeBtn = document.querySelector('.modal__btn--close');
	const site = document.querySelector('.site-container');
	function openModal() {
		modal.classList.add('modal--active');
		modalWindow.classList.add('focus-visible');
		modalWindow.classList.add('modal__window--active');
		document.body.classList.add('stop-scroll');
		site.classList.add('site-container--hidden');
	}
	function closeModal() {
		modal.classList.remove('modal--active');
		modalWindow.classList.remove('focus-visible');
		modalWindow.classList.remove('modal__window--active');
		document.body.classList.remove('stop-scroll');
		site.classList.remove('site-container--hidden');
		document.querySelector('#formModal').reset();
	}
	visitBtn.addEventListener('click', function() {
		openModal()
	});
	closeBtn.addEventListener('click', function() {
		closeModal()
	});
	modal.addEventListener('click', (e) => {
		if (e.target == modal || e.target == modalWindow) {
			closeModal()
		}
	})
	document.addEventListener('keyup', function(e) {
		if (e.key === "Escape") {
			closeModal()
		}
	});
	// player_btn - podcasts
	let playBtn = document.querySelectorAll('.btn-play');
	playBtn.forEach(function(element) {
		element.addEventListener('click', function() {
			let playIcon = element.querySelectorAll('.btn-play__icon');
			playIcon.forEach(function(btn){ btn.classList.toggle('btn-play__icon--active')});
			playIcon.forEach(function(btn){ btn.classList.toggle('btn-play__icon--disable')});
		});
	});
	// like_btn - podcasts
	let likeBtn = document.querySelectorAll('.btn-action');
	likeBtn.forEach(function(element) {
		element.addEventListener('click', function() {
			let likeIcon = element.querySelectorAll('.btn-action__icon');
			likeIcon.forEach(function(like){ like.classList.toggle('btn-action__icon--visible')});
			likeIcon.forEach(function(like){ like.classList.toggle('btn-action__icon--hidden')});
			let count = element.getAttribute('data-count')
			console.log(count);
			if (element.like) element.like = !element.like
			else element.like = true
			element.like ? count =  element.setAttribute('data-count', ++count) : count = element.setAttribute('data-count', --count);
			element.classList.toggle('btn-action--active')
		});
	});
})
