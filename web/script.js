document.addEventListener('DOMContentLoaded', function() {
	let copyrightElement = document.getElementsByClassName('copyright')[0];
	let currentYear = new Date().getFullYear();
	copyrightElement.textContent = `© ${currentYear} DMS Services`
});