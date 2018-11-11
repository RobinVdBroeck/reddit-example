const readlineInterface = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
});

const readline = question => {
  return new Promise((resolve, reject) => {
    readlineInterface.question(question, response => {
      resolve(response);
    });
  });
};

module.exports = {
  readline
};
