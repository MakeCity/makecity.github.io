new Glide('.glide', {
    type: 'carousel',
    startAt: 1,
    perView: 1,
    gap: 33,
    peek: {
        before: 100,
        after: 100
    },
    breakpoints: {
        900: {
            gap: 20,
            peek: {
                before: 40,
                after: 40
            },
        },
        768: {
            gap: 8,
            peek: {
                before: 16,
                after: 16
            },
        }
    }
}).mount();

const handleCopyToClipBoard = (text) => {
    navigator.clipboard.writeText(text);
}

let copyButtons = document.querySelectorAll('.mc-copy-btn');

copyButtons.forEach(item => {
    item.addEventListener('click', function() {
        const value = this.getAttribute('data-copy');
        handleCopyToClipBoard(value);
    })
})
