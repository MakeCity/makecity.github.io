const handleCopyToClipBoard = (text) => {
  navigator.clipboard.writeText(text)
}

const showTooltip = button => {
  button.classList.add('mc-copy-btn__copied');
}

const hideTooltip = button => {
  button.classList.remove('mc-copy-btn__copied');
}

export const initCopyButtons = () => {
  let copyButtons = document.querySelectorAll('.mc-copy-btn')

  copyButtons.forEach((item) => {
    item.addEventListener('click', function () {
      const value = this.getAttribute('data-copy')
      handleCopyToClipBoard(value);
      showTooltip(item);
      this.setAttribute('data-copy-tooltip', 'Copied')
    });

    item.addEventListener('mouseenter', function () {
      showTooltip(item);
      this.setAttribute('data-copy-tooltip', 'Copy')
    })

    item.addEventListener('mouseleave', function () {
      hideTooltip(item);
      this.setAttribute('data-copy-tooltip', 'Copy')
    })
  })
};
