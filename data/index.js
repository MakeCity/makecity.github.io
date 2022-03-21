const localizedContent = require('./localizedContent')

const siteUrl = 'https://makecity.github.io';

module.exports = {
    siteUrl,
    languages: {
        default: 'en',
        list: [{
            "code": "en",
            "name": "English",
        }, {
            "code": "uk",
            "name": "Українська",
        }],
    },
    headTags: [
        '<title>Make the city: Help us save the city and its people</title>',
        '<meta name="viewport" content="width=device-width, initial-scale=1">',
        '<meta http-equiv="x-ua-compatible" content="ie=edge" />',
        '<meta name="description" content="Do you want to help the city of Kharkiv and its inhabitants? Make your donation for the benefit of citizens and the Armed Forces!">',
        '<meta name="robots" content="noindex,nofollow">',
        `<link rel="canonical" href="${ siteUrl }" />`,
    ],
    localizedContent,
    cityCarousel: {
        slides: [{
            image: 'mirror_stream.jpg',
        }, {
            image: 'Opera_and_Ballet_Theater_Kharkiv.jpg',
        }, {
            image: 'mirror_stream.jpg',
        }],
    },
    socialMedia: {
        isRendered: false,
        items: [{
            icon: 'share.svg',
            href: '',
            alt: 'Share this page',
        }, {
            icon: 'email.svg',
            href: '',
            alt: 'Share via email',
        }, {
            icon: 'messenger.svg',
            href: '',
            alt: 'Share via Messenger',
        }, {
            icon: 'whatsapp.svg',
            href: '',
            alt: 'Share via WhatsApp',
        }, {
            icon: 'facebook.svg',
            href: '',
            alt: 'Share via Facebook',
        }, {
            icon: 'twitter.svg',
            href: '',
            alt: 'Share via Twitter',
        }, {
            icon: 'linkedin.svg',
            href: '',
            alt: 'Share via LinkedIn',
        }],
    },
}
