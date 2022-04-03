const fs = require('fs');
const path = require('path');
const paths = require('./paths');
const readContent = require('./readContent');

(() => {
    const content = readContent();
    const url = new URL(content.appConfig.fields.data.siteUrl);
    fs.writeFileSync(path.join(paths.build, 'CNAME'), url.hostname);
})();
