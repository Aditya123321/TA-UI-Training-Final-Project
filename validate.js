const validator = require('html-validator');
const fs = require('fs');
var options = {
  format: 'text'
}

fs.readFile( 'src/index.html', 'utf8', (err, html) => {
  if (err) {
    throw err;
  }

  options.data = html;

  validator(options, (error, data) => {
    if (error) {
      console.error(error);
    }

    console.log(data);
  });
});
