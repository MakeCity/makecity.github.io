const richHtmlRenderer = require('@contentful/rich-text-html-renderer');

const reachContentFieldsDescriptors = [{
    id: 'localizedTextSample',
    name: 'description'
}];

const getRichTextFieldDescriptor = (entry) => {
    return reachContentFieldsDescriptors.find(({ id, name }) => {
        return id === entry.sys.contentType.sys.id
            && !!entry.fields
            && !!entry.fields[name];
    });
};

const renderReachTextFields = (languages, jsonContent) => {
    languages.items.forEach(({ code }) => {
        jsonContent[code].entries.items = jsonContent[code].entries.items.map((entry) => {
            const richTextFieldDescriptor = getRichTextFieldDescriptor(entry);
            if (richTextFieldDescriptor) {
                const rawRichTextField = entry.fields[richTextFieldDescriptor.name];
                entry.fields[richTextFieldDescriptor.name] = richHtmlRenderer.documentToHtmlString(rawRichTextField);
            }
            return entry;
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
                links: localeContent.entries.items.filter(entry => entry.sys.contentType.sys.id === 'siteLinks'),
            },
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
    const stringifiedContent = renderReachTextFields(languages, jsonContent);
    return {
        languages: languagesSection,
        content: createTemplateDataModel(languages, stringifiedContent),
    };
};

module.exports = {
    processContent,
};
