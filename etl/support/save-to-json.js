const fs = require('fs');

function saveToJSON(filename, rawData) {
  const data = JSON.stringify(rawData);

  fs.writeFileSync(`./static/data/${filename}.json`, data);
}

module.exports = saveToJSON
