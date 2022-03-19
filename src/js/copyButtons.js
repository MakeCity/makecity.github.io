const handleCopyToClipBoard = (text) => {
  navigator.clipboard.writeText(text)
}

let copyButtons = document.querySelectorAll('.mc-copy-btn')

copyButtons.forEach((item) => {
  item.addEventListener('click', function () {
    const value = this.getAttribute('data-copy')
    handleCopyToClipBoard(value)
  })
})
