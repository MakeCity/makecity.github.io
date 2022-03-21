const activeClassName = 'mc-lang__link--current';
const languageSwitcherElement = document.getElementById('language-switcher');

let langLinks = languageSwitcherElement.querySelectorAll('.mc-lang__link')

langLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const value = this.getAttribute('data-lang')
        langLinks.forEach((link) => link.classList.remove(activeClassName));
        this.classList.add(activeClassName);
        switchLanguage(value)
    })
});

const switchLanguage = (code ) => {
    document.documentElement.setAttribute('lang', code);
};
