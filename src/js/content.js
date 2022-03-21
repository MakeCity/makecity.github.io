// todo use import instead require
const contentful = require('contentful');
const Mustache = require('mustache');

const client = contentful.createClient({
    space: 'lilgc54t56wx',
    accessToken: 'bu44XBm_6pwRiN7oTREUS-R9WQwicwAVvqPaTHsTl38',
});

// content_type: 'heroSlider' - get data from shorturl.at/vwzLN
client.getEntries({content_type: 'heroSlider'})
    .then((response) => {
        console.log(response);

        // transfer data to html via mustache
        // todo remove
        let template = document.getElementById('hero');
        template.innerHTML = Mustache.render(template.innerHTML, {slides: response.items});
    })
    .catch((error) => {
        console.log(error)
    })
