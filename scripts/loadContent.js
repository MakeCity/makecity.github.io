const fs = require('fs');
const contentful = require('contentful');
const paths = require('./paths');
const { processContent } = require('./processContent');
const isProduction = process.env.NODE_ENV !== 'development';

let contentfulSpaceId = process.env.CONTENTFUL_SPACE_ID;
let contentfulAccessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

if (!isProduction) {
    const localSecrets = require('../config/secrets');
    contentfulSpaceId = localSecrets.CONTENTFUL_SPACE_ID;
    contentfulAccessToken = localSecrets.CONTENTFUL_ACCESS_TOKEN;
}

const client = contentful.createClient({
    space: contentfulSpaceId,
    accessToken: contentfulAccessToken,
});

const saveContent = (jsonContent) => {
    let data = JSON.stringify(jsonContent, null, 2);
    fs.writeFileSync(paths.contentFile, data);
};

const loadEntries = async (client, languages) => {
    let entries = {};
    for (const language of languages.items) {
        entries[language.code] = await client.getEntries({
            locale: language.code,
            include: 10,
        });
    }
    return entries;
};

const loadAssets = async (client, languages) => {
    let assets = {};
    for (const language of languages.items) {
        assets[language.code] = await client.getAssets({ locale: language.code });
    }
    return assets;
};

const finishLog = (code) => {
    global.console.log('--------------------------');
    global.console.log(`Content loading finished ${code ? 'with errors :(' : 'successfully!' } Exiting...`);
    global.console.log('--------------------------');

    process.exit(code);
};

(async () => {
    global.console.log('Loading content...');

    try {
        const languages = await client.getLocales();
        const loadedContent  = {
            assets: await loadAssets(client, languages),
            entries: await loadEntries(client, languages),
        };
        const localizedContent = languages.items.reduce((acc, { code }) => {
            acc[code] = {
                assets: loadedContent.assets[code],
                entries: loadedContent.entries[code],
            };
            return acc;
        }, {});
        const processedContent = processContent(languages, localizedContent);
        saveContent(processedContent);

        finishLog(0);
    } catch (e) {
        global.console.log(e);
        finishLog(1);
    }
})();
