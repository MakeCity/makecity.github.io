const fs = require('fs');
const path = require('path');
const paths = require('./paths');


module.exports = () => {
    const rawData = fs.readFileSync(paths.contentFile);
    return JSON.parse(rawData);
};
