const richHtmlRenderer = require('@contentful/rich-text-html-renderer');

const renderReachTextFields = (languages, jsonContent) => {
    languages.items.forEach(({ code }) => {
        // map section
        const { countriesThatHelped, citiesThatGotHelp } = jsonContent[code].sections.map.fields;
        [
            ...countriesThatHelped,
            ...citiesThatGotHelp,
        ].forEach(({ fields }) => {
            if (!fields.description) {
                return;
            }
            fields.description = richHtmlRenderer.documentToHtmlString(fields.description);
        });
    });
    return jsonContent;
};

const createTemplateDataModel = (languages, jsonContent) => {
    return languages.items.reduce((acc, { code }) => {
        const localeContent = jsonContent[code];
        acc[code] = {
            head: {
                title: localeContent.entries.items.find(entry => entry.sys.contentType.sys.id === 'siteTitle'),
                meta: localeContent.entries.items.filter(entry => entry.sys.contentType.sys.id === 'siteMeta'),
            },
            sections: localeContent.entries.items.find(entry => entry.sys.contentType.sys.id === 'sections').fields,
        };
        return acc;
    }, {});
};

const processContent = (languages, jsonContent) => {
    delete jsonContent.nextSyncToken;
    const defaultLanguage = languages.items.find((lang) => lang.default === true);
    const languagesSection = {
        default: defaultLanguage.code,
        items: languages.items,
    };
    const templateDataModel = createTemplateDataModel(languages, jsonContent);
    const stringifiedContent = renderReachTextFields(languages, templateDataModel);
    const appConfig = jsonContent[languagesSection.default].entries.items.find(entry => entry.sys.contentType.sys.id === 'appConfig');

    return {
        languages: languagesSection,
        content: stringifiedContent,
        appConfig,
    };
};

module.exports = {
    processContent,
};
