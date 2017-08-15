const path = require('path');
const fs = require('fs');
const jsonQuery = require('json-query');

const projectFile = () => {
      if (fs.existsSync('./.firefunctions-cli.json')) {
            return './.firefunctions-cli.json'
      } else if (fs.existsSync('../.firefunctions-cli.json')) {
            return '../.firefunctions-cli.json'
      } else {
            return ''
      }
}
exports.getFromCliConfig = (query) => {
      var file = projectFile()
      if (file != '') {
            var jsonData = JSON.parse(fs.readFileSync(file, 'utf8'));
            return jsonQuery(query, {
                  data: jsonData
            }).value;
      } else {
            return ''
      }
}

exports.is_project = () => {
      if (fs.existsSync('./.firefunctions-cli.json')) {
            return true
      } else {
            return false
      }
}

// module.exports = readCliConfig;