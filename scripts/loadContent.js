const fs = require('fs');
const contentful = require('contentful');
const paths = require('./paths');

// @TODO: create dedicated account and secure variablles via Github secrets
const SPACE_ID = 'lilgc54t56wx';
const CONTENTFUL_ACCESS_TOKEN = 'bu44XBm_6pwRiN7oTREUS-R9WQwicwAVvqPaTHsTl38';

const client = contentful.createClient({
    space: SPACE_ID,
    accessToken: CONTENTFUL_ACCESS_TOKEN,
});

const processContent = (languages, jsonContent) => {
    delete jsonContent.nextSyncToken;

    const defaultLanguage = languages.items.find((lang) => lang.default === true);

    const languagesSection = {
        defaultLanguageCode: defaultLanguage.code,
        items: languages.items,
    };
    return {
        languages: languagesSection,
        content: jsonContent,
    };
};

const saveContent = (jsonContent) => {
    let data = JSON.stringify(jsonContent);
    fs.writeFileSync(paths.contentFile, data);
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
        const content  = await client.sync({ initial: true });

        const processedContent = processContent(languages, content);
        saveContent(processedContent);

        finishLog(0);
    } catch (e) {
        finishLog(1);
    }
})();
