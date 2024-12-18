document.addEventListener('DOMContentLoaded', function() {
	let currentYear = new Date().getFullYear();
	let copyrightElement = document.getElementsByClassName('copyright')[0];
		copyrightElement.textContent = `© ${currentYear} DMS Services`
});