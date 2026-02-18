document.addEventListener('DOMContentLoaded', function() {

	const menu = document.querySelector('.nav__wrap');
	const header = document.querySelector('.header');

	function handleScroll() {

		// Только для десктопа
		if (window.innerWidth < 980) {
			menu.classList.remove('is-fixed');
			return;
		}

		const headerHeight = header.offsetHeight;

		if (window.scrollY >= headerHeight) {
			menu.classList.add('is-fixed');
		} else {
			menu.classList.remove('is-fixed');
		}
	}

	window.addEventListener('scroll', handleScroll);
	window.addEventListener('resize', handleScroll);

	handleScroll();
});